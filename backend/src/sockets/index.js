import { Server } from "socket.io";
import { onlineUsers } from "./onlineUsersMap.js";
import { config } from "../utils/config.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import chat from "../models/chat.model.js";
import cookie from "cookie";

let io;

const socketCorsConfig = {
  origin: [config.cors_url, 'http://127.0.0.1:5127'],
  credentials: true,
};

const initSocket = (server) => {
  io = new Server(server, {
    cors: socketCorsConfig,
  });

  io.use((socket, next) => {
    const rawCookies = socket.handshake.headers.cookie || "";
    const cookies = cookie.parse(rawCookies);
    const token = cookies.accessToken;

    if (!token) return next(new ApiError(401, "No cookie set"));

    try {
      const user = jwt.verify(token, config.access_token_secret);
      socket.user = user;
      console.log('here socket user ', socket.user, 'socket id', socket.id)
      next();
    } catch (error) {
      return next(new ApiError(401, "Invalid token"));
    }
  });

  io.on("connection", async (socket) => {
    socket.on("auth", async (userId) => {
      onlineUsers.set(userId, socket.id);

      //here when user get connected with websocket then i should find the chat which is undeleverd to that user if there be so send that chat to the user and delet thos chat 
      try {
        
        const undeleverdMessage = await chat.find({ receiver:userId });

        console.log('Undeleverd messages..', undeleverdMessage.length);

        //send echa message to the client and delete those after sending
        for(const message of undeleverdMessage){
          io.to(socket.id).emit("recieve_message", {
            senderId: message.sender.toString(),
            text: message.content,
            time: message.time,
            delivered: true
          }, async (ackData) => {
              await chat.findByIdAndDelete(message._id);
              console.log('ackData line 58', ackData);
              console.log(`Message ${message._id} deleted after acknowledgment.`);
          });
        };

      } catch (error) {
        console.error("Error fetching/sending/deleting unsent messages.. ", error);
      }

      console.log('userId',userId, 'socketId',socket.id);
    });

    try {
      const userId = socket.user?._id;
      const chats = await chat.find({ receiver: userId });
      // console.log("Unused user chat", chats);
     
    } catch (error) {
      throw new ApiError(501, "Not able to fetch chats from database.");
    }

    socket.on("private_message", async (data, callback) => {
      const { recieverId, text, time } = {...data};
      // console.log('recieverId line 55 socket/index.js', recieverId)
      const recieverSocketId = onlineUsers.get(recieverId);
      console.log('recieverSocketId',recieverSocketId)
      console.log('all onlineUser kyes', Array.from(onlineUsers.keys()))
      const senderId = socket.user._id;

      // console.log('socket/index.js receiverSocketId', recieverSocketId)
      if (recieverSocketId) {
        console.log('socket/index.js line 63 senderid', senderId)
        io.to(recieverSocketId).emit("recieve_message", { senderId, text, time, delivered: true }, callback({ status: "delivered" }));
      } else {

        // console.log('executing create chat in database line 63 index.js')
        try {
          await chat.create({ //here some problem with creating chat in database 
          sender: socket.user._id,
          receiver: recieverId,
          content: text,
          time: time,
          });

          callback({ status: "failed" });
        } catch (error) {
          console.log('creting chat erro in database', error)
        }
      }
    });

    socket.on("disconnect", () => {
      if (socket.user) {
        onlineUsers.delete(socket.user._id);
        console.log(`User ${socket.user._id} disconnected.`);
      }
    });
  });
};

function getIO() {
  if (!io) throw new ApiError(501, "Socket not properly created");
  return io;
}

export { initSocket, getIO };
