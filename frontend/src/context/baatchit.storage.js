import { configureStore, createSlice } from "@reduxjs/toolkit";

console.log('baatchit storage');

const baatchitStatus = createSlice({
    name:"battchitStorage",

    initialState:{
        friends:[],
    },

    reducers:{
        addFriend: function (state, action) {
            state.friends.push({...action.payload});
        }
    }
});

export const { addFriend } = baatchitStatus.actions;

const baatStore = configureStore({
    baatchitStore:baatchitStatus.reducer,
});

export default baatStore;
