import { createSlice } from "@reduxjs/toolkit";

const getChatId = () => {
  if (crypto && crypto.randomUUID) {
    return crypto.randomUUID();
  } else {
    // Simple fallback UUID generator
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}


const baatchitSlice = createSlice({
    name:"baatchitStorage",

    initialState:{
        friends:{}, 
        chats:{} 
    },

    reducers:{
        addFriend: function (state, action) {
            const {friendUserId, fullname, email} = {...action.payload};

            //fistly create chatId
            const chatId = getChatId();

            //insert inside Friends initial state
            state.friends[friendUserId] = { _id:friendUserId, fullname, email, chatId };

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
            const {authUserId, senderId, recieverId, text, time, delivered} = {...action.payload};
            console.log(action.payload);

            if(senderId === authUserId){ // it means i know that how is reciever and i must have a reciever info in friends

                const chatID = state.friends[recieverId].chatId;
                state.chats[chatID][getChatId()] = { senderId, recieverId, text, time, delivered};

            }else{ // it means i'm reciever & either i know the friend or even not
                //so firsly take a look in friend data that is this friend exist or not
                const isFriendExist = state.friends[senderId];

                if(isFriendExist){
                    const chatID = isFriendExist.chatId;
                    state.chats[chatID][getChatId()] = { senderId, recieverId, text, time, delivered};
                }else{ //if i don't know the sender friend so do this
                    const chatId = getChatId();
                    state.friends[senderId] = {
                        _id: senderId,
                        fullname: String(senderId),
                        email: null,
                        chatId
                        };
                    state.chats[chatId] = {};
                    state.chats[chatId][getChatId()] = { senderId, recieverId, text, time, delivered };
                }

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
