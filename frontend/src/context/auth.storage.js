import {configureStore, createSlice } from "@reduxjs/toolkit";


const userFromStorage = JSON.parse(localStorage.getItem('authUser'));
const loginStatusFromStorage = localStorage.getItem('isLogedIn') === "true";

const authStatus = createSlice({
    name:"authStore",

    initialState: {
        isLogedIn: loginStatusFromStorage,
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
            state.isLogedIn = true;

            localStorage.setItem('authUser',JSON.stringify(state.authUser));
            localStorage.setItem('isLogedIn', 'true');
        },

        eraseUser: function (state, _) {
            Object.assign(state.authUser, {id:null, fullName:null, email:null, username:null})
            state.isLogedIn = false;

            localStorage.removeItem('authUser');
            localStorage.removeItem('isLogedIn');
        },

        setIsLogedIn: function (state, action) {
            state.isLogedIn = action.payload;
        }
    }
});

export const {addUser, eraseUser, setIsLogedIn} = authStatus.actions;

const store = configureStore({
    reducer: {
        authStore:authStatus.reducer,
    }
});

export default store;
