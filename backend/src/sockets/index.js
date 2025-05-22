
import {Server} from "socket.io";

import { onlineUsers } from "./onlineUsersMap.js";
import { config } from "../utils/config.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import chat from "../models/chat.model.js";

let io;
const socketCorsConfig = {
    origin:config.cors_url,
    creadentials:true
}

const initSocket =  (server) => {
    io = new Server(server, {
        cors:socketCorsConfig,
    });

    io.use((socket, next) => {
        const cookies = socket.handshake.headers.cookie;

        if(!cookies){
            return next(new ApiError(401, 'No cookie set'))
        };

        try {
            const user = jwt.verify(cookies?.accessToken, config.access_token_secret);
            socket.user = user;
            next();

        } catch (error) {
            return next(new ApiError(401, "Invalid token"))
        }
    })

    io.on("connection", async (socket) => {

        //fistly map user into onlineUsers
        socket.on('auth', async (userId) => {
            onlineUsers.set(userId, socket.id);
        });

        //then check is there have any undeleverd message for user
        try {
            const userId = socket.user?.id;
            const chats = await chat.find({receiver: userId}).populate('receiver');

            console.log(' unsed user chat ',chats);

            //if chats have the chat then send it via loog

            // io.to(socket.id).emit('recieve_message', )

        } catch (error) {
            throw new ApiError(501, 'Not able to fatch chats from database. ');
        }

        //if there have some message for user then extract it from server
        //then delete it from the server


        socket.on('private_message',async ({recieverId, text, time}, callback) => {

            const recieverSocketId = onlineUsers[recieverId];
            const senderId = socket.user.id;

            if(recieverSocketId){
                //send text to receaverSocketID
                io.to(recieverSocketId).emit('recieve_message', { senderId, text, time, delevered:true});
                callback({status: 'delivered'});

            }else{
                //that means user currently offline
                //so temporary store chat in chat database and send sender deliverd: false tag
                // {
                // sender, receiver, content, time
                // }

                await chat.create({
                    sender:senderId,
                    receiver:recieverId,
                    content: text,
                    time: time
                });

                await chat.save();

                callback({status:"failed"});
            };
        });

        socket.on("disconnect", () => {
            //remove user from map
            if(socket.user){
                onlineUsers.delete(socket.userId);
            };

            console.log(`User ${socket.userId} disconnected.`)
        })

    });


}

function getIO() {
    if(!io){
        throw new ApiError(501, "Socket not porperly created")
    }
    return io;
}

export { initSocket, getIO };
