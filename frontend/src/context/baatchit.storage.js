import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const getChatId = () => crypto.randomUUID();

class friend {
    constructor(friendUserId, fullname, email, chatId){
        this.friendUserId = friendUserId;
        this.fullname = fullname
        this.email = email
        this.chatId = chatId
    }
}

class chat {
    constructor(senderId, recieverId, text, time, delevered=false ) {
        this.senderId = senderId
        this.recieverId = recieverId
        this.text = text
        this.time = time
        this.delevered = delevered 
    }
}


const baatchitSlice = createSlice({
    name:"battchitStorage",

    initialState:{
        friends:{}, 
        chats:{} 
    },

    reducers:{
        addFriend: function (state, action) {
            const {friendUserId, fullname, email} = {...action.payload};

            //fistly create chatId
            const chatId = getChatId();

            //create new friend object via friend class
            const newFriend = new friend(friendUserId, fullname, email, chatId);

            //insert inside Friends initial state
            state.friends[friendUserId] = newFriend;

            //then create chat space for new friend like chats[chatId]: [];
            state.chats[chatId] = {};

        },

        removeFriend: function (state, action) {
            const {friendUserId} = {...action.payload};

            const deleteChatId = state.friends[friendUserId].chatId;

            delete state.chats[deleteChatId];
            delete state.friends[friendUserId];


        },

        addChat: function (state, action) {
            const {authUserId, senderId, recieverId, text, time, delevered} = {...action.payload};
            const particulurChatId = getChatId();

            //if me as a sender then
            if(senderId === authUserId){
                //firstly go to find frined chat id
                const friendChatId = state.friends[recieverId].chatId;

                // then add new chat into the frind chats
                state.chats[friendChatId][particulurChatId] = new chat(senderId, recieverId, text, time, delevered);

            // if i'm not a sender then
            }else{
                const friendChatId = state.friends[senderId].chatId;
                state.chats[friendChatId][particulurChatId] = new chat(senderId, recieverId, text, time);
            }

        },

        deleteChat: function (state, action) {
            const {particulurChatId, chatId} = {...action.payload};

            //delete state.chats[chatId][particulurChatId]
            delete state.chats[chatId][particulurChatId];
        }
    }
});



export const { addFriend, removeFriend, addChat, deleteChat } = baatchitSlice.actions;

export default baatchitSlice.reducer;
