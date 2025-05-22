
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootStore.js";

const store = configureStore({
    reducer:rootReducer,
});


export default store;
