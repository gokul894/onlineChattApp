import {configureStore, createSlice } from "@reduxjs/toolkit";


const userFromStorage = JSON.parse(localStorage.getItem('authUser'));

const authStatus = createSlice({
    name:"authStore",

    initialState: {

        authUser: userFromStorage || {
            id:null,
            fullname:null,
            email:null,
            username:null
        },

    },

    reducers:{
        addUser: function (state, action) {
            Object.assign(state.authUser, {...action.payload});

            localStorage.setItem('authUser',JSON.stringify(state.authUser));
        },

        eraseUser: function (state, _) {

            localStorage.removeItem('authUser');

            Object.assign(state.authUser, {id:null, fullName:null, email:null, username:null})

        },

    }
});

export const {addUser, eraseUser} = authStatus.actions;

const store = configureStore({
    reducer: {
        authStore:authStatus.reducer,
    }
});

export default store;
