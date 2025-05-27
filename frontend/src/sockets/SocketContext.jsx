import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { addChat } from "../context/baatchit.storage";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.authUser);
    const socketRef = useRef(null);
    const [socketInstance, setSocketInstance] = useState(null);

    useEffect(() => {
        if (!user) return;

        const socket = io("http://localhost:8000", {
            withCredentials: true,
            transports: ["websocket"],
        });

        socketRef.current = socket;
        setSocketInstance(socket);

        socket.on('connect', () => {
            socket.emit('auth', user._id);
            console.log('Socket connected:', socket.id);
        });

        socket.on('connect_error', (err) => {
            console.error('Connection error:', err);
        });

        socket.on("recieve_message", (data, ackCallBack) => {
            const {senderId, text, time, delivered} = {...data}
            console.log('data',data)
            console.log('Message received:', {senderId, text, time, delivered});
            dispatch(addChat({
                authUserId: user._id,
                senderId,
                recieverId: user._id,
                text,
                time,
                delivered
            }));

            ackCallBack({ status: "received", receivedAt: Date.now() });
        });

        socket.on('disconnect', (reason) => {
            console.log('Socket disconnected:', reason);
        });

        return () => {
            socket.disconnect();
            socketRef.current = null;
            setSocketInstance(null);
        };
    }, [user]);

    return (
        <SocketContext.Provider value={socketInstance}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const socket = useContext(SocketContext);
    if (!socket) throw new Error("Socket not available. Make sure SocketProvider is used.");
    return socket;
};


