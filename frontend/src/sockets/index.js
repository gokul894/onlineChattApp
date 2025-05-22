
import {io} from "socket.io-client";
import {useDispatch, useSelector} from "react-redux"
import { addChat } from "../context/baatchit.storage";

const loggedUser = useSelector(state => state.authStore.authUser);
const dispatch = useDispatch();

function initSocketConnection() {
    if(loggedUser){

        const socket = io('http://localhost:8000', {
            withCredentials:true
        });

        //send acknowlage request to the server socket
        socket.emit('auth', loggedUser?.id);

        socket.on('recieve_message', ({senderId, text, time}, ) => {
            //here i will store text in senderId context {authUserId, senderId, recieverId, text, time}
            dispatch(addChat({authUserId:loggedUser.id, senderId, recieverId:loggedUser, text, time}));

        });

        return socket;

    } else{
        return new Error('Please login first..');
    }
};

export {initSocketConnection};
