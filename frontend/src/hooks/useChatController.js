import { useDispatch, useSelector } from "react-redux";
import { addChat } from "../context/baatchit.storage";
import { useSocket } from "../sockets/SocketContext";


const useSendMessage = () => {
    const dispatch = useDispatch();
    const { _id: senderId } = useSelector(state => state.auth.authUser);
    const socket = useSocket();

    const sendMessage = (recieverId, text) => {
        const time = String(new Date());

        socket?.emit('private_message', { recieverId, text, time }, (ack) => {
            const delivered = ack?.status === "delivered";
            dispatch(addChat({ //{authUserId, senderId, recieverId, text, time, delivered}
                authUserId:senderId,
                senderId,
                recieverId,
                text,
                time,
                delivered
            }));
        });
    };

    return sendMessage;
};

export { useSendMessage };
