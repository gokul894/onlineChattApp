
import { createSlice } from "@reduxjs/toolkit"


const sectionViewSlice =  createSlice({
    name:"sectionTwoView",

    initialState: {

        sectionTwo:{
            action:'default',
            userId:null
        }

    },

    reducers: {
        addsectionTwo: function (state, action) {
            state.sectionTwo = {...action.payload}
        }
    }


});

export const { addsectionTwo } = sectionViewSlice.actions;
export default sectionViewSlice.reducer;