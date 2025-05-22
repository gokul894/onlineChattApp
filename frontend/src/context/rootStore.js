 
import { combineReducers } from "redux";
import authReducer from "./auth.storage.js";
import chatReducer from "./baatchit.storage.js";

const rootReducer = combineReducers({
    auth:authReducer,
    chat:chatReducer
});

export default rootReducer;

