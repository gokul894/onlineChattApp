
import { Router } from "express";
import { login, logout, ragister} from "../controllers/auth.conroller.js";
import { verifyJwt } from "../middlewares/verifyJwt.js";


const router = Router();

router.post('/ragister', ragister);
router.post('/login', login);
router.post('/logout', verifyJwt, logout);


export {router};