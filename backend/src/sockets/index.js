import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import cookie from "cookie";

import { onlineUsers } from "./onlineUsersMap.js";
import { config } from "../utils/config.js";
import { ApiError } from "../utils/ApiError.js";
import chat from "../models/chat.model.js";

let io;

const socketCorsConfig = {
  origin: [config.cors_url, "http://127.0.0.1:5127"],
  credentials: true,
};

const initSocket = (server) => {
  io = new Server(server, { cors: socketCorsConfig });

  // Middleware: Authenticate socket connection using JWT from cookies
  io.use((socket, next) => {
    try {
      const rawCookies = socket.handshake.headers.cookie || "";
      const cookies = cookie.parse(rawCookies);
      const token = cookies.accessToken;

      if (!token) return next(new ApiError(401, "No access token cookie"));

      const user = jwt.verify(token, config.access_token_secret);
      socket.user = user;

      console.log("Socket authenticated:", socket.user, "Socket ID:", socket.id);
      next();
    } catch (error) {
      return next(new ApiError(401, "Invalid token"));
    }
  });

  // Main socket connection handler
  io.on("connection", async (socket) => {
    const userId = socket.user?._id;

    // Register user socket ID
    socket.on("auth", async (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log("User connected:", { userId, socketId: socket.id });

      // Find and deliver undelivered messages
      try {
        const undeliveredMessages = await chat.find({ receiver: userId });
        console.log("Undelivered messages:", undeliveredMessages.length);

        for (const message of undeliveredMessages) {
          io.to(socket.id).emit(
            "recieve_message",
            {
              senderId: message.sender.toString(),
              text: message.content,
              time: message.time,
              delivered: true,
            },
            async (ackData) => {
              await chat.findByIdAndDelete(message._id);
              console.log("Message acknowledged and deleted:", ackData);
            }
          );
        }
      } catch (error) {
        console.error("Error handling undelivered messages:", error);
      }
    });

    // Handle private messages
    socket.on("private_message", async (data, callback) => {
      const { recieverId, text, time } = data;
      const recieverSocketId = onlineUsers.get(recieverId);
      const senderId = socket.user._id;

      if (recieverSocketId) {
        // Receiver is online - deliver immediately
        io.to(recieverSocketId).emit(
          "recieve_message",
          { senderId, text, time, delivered: true },
          callback({ status: "delivered" })
        );
      } else {
        // Receiver is offline - store message in DB
        try {
          await chat.create({
            sender: senderId,
            receiver: recieverId,
            content: text,
            time,
          });
          callback({ status: "failed" }); // Marked as failed for now
        } catch (error) {
          console.error("Failed to store message in DB:", error);
        }
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      if (socket.user) {
        onlineUsers.delete(socket.user._id);
        console.log(`User ${socket.user._id} disconnected.`);
      }
    });

    try {
      await chat.find({ receiver: userId });
    } catch (error) {
      throw new ApiError(501, "Unable to fetch user chats.");
    }
  });
};

// Helper to get initialized socket.io instance
function getIO() {
  if (!io) throw new ApiError(501, "Socket.IO not initialized");
  return io;
}

export { initSocket, getIO };
