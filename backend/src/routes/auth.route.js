
import { Router } from "express";
import { authenticate, login, logout, ragister} from "../controllers/auth.conroller.js";
import { verifyJwt } from "../middlewares/verifyJwt.js";
import { deleteMessage, listParticipants, sendMessage } from "../controllers/message.controller.js";

const router = Router();

//auth routes
router.post('/ragister', ragister);
router.post('/login', login);
router.post('/logout', verifyJwt, logout);


//send, listuser, delete message 
router.post('/sendmessage:id', verifyJwt, sendMessage);
router.delete('/deletemessage:id', verifyJwt, deleteMessage);
router.post('/listparticipants', verifyJwt, listParticipants);
router.get('/authenticate', verifyJwt, authenticate);


export {router};