 
import { combineReducers } from "redux";
import authReducer from "./auth.storage.js";
import chatReducer from "./baatchit.storage.js";
import sectionReducer from "./sectionTwo.storage.js"

const rootReducer = combineReducers({
    auth:authReducer,
    chat:chatReducer,
    sectionUpdate:sectionReducer
});

export default rootReducer;

