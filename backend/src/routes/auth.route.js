
import { Router } from "express";
import { authenticate, login, logout, ragister} from "../controllers/auth.conroller.js";
import { verifyJwt } from "../middlewares/verifyJwt.js";
import { isFriend } from "../controllers/recog.controller.js";
// import { deleteMessage, listParticipants, sendMessage } from "../controllers/message.controller.js";

const router = Router();

//auth routes
router.post('/auth/ragister', ragister);
router.post('/auth/login', login);
router.post('/auth/logout', verifyJwt, logout);
router.get('/auth/authenticate', verifyJwt, authenticate);
router.post('/isfriend', verifyJwt, isFriend);


//send, listuser, delete message 
// router.post('/sendmessage', verifyJwt, sendMessage);



export {router};;