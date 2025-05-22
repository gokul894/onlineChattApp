

import { useDispatch, useSelector } from "react-redux";
import { initSocketConnection } from "../sockets";
import { addChat } from "../context/baatchit.storage";
import { time } from "console";

const dispatch = useDispatch();
const currentDate = new Date();


const socket = initSocketConnection();

const sendMessage = ({recieverId, text}) => {

    //now send a message to particular user
    const {id, ...rest} = useSelector(state => state.authStore.authUser);

    //firstly store the chat inside chatStore
    const senderId = id;
    let delevered;

    //send message and get feedback that it deleverd or not
    socket?.emit('private_message', {recieverId, text, time:currentDate}, (ack) => {

        if(ack.status === "delivered"){
            delevered = true;
        }else{
            delevered = false;
        }

    });

    //if server give me back deleverd:false or deleverd: true
    dispatch(addChat({senderId, recieverId, text, time:currentDate,  delevered}));   // {senderId, recieverId, text, time, deleverd}

    //then send this to the friend

};
