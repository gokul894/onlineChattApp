import { createSlice } from "@reduxjs/toolkit";


const userFromStorage = JSON.parse(localStorage.getItem('authUser'));

const authSlice = createSlice({
    name:"authStore",

    initialState: {

        authUser: userFromStorage || {
            _id:null,
            fullname:null,
            email:null,
            username:null
        }
    },

    reducers:{
        addUser: function (state, action) {
            const {_id, fullname, email, username} = action.payload;

            state.authUser = { _id, fullname, email, username }
        
            localStorage.setItem('authUser',JSON.stringify(state.authUser));
        },

        eraseUser: function (state, _) {

            state.authUser = {_id:null, fullname:null, email:null, username:null}
            localStorage.removeItem('authUser');

        },

    }
});

export const {addUser, eraseUser} = authSlice.actions;
export default authSlice.reducer;
