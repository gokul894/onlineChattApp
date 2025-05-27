
import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyJwt.js";
import { isFriend } from "../controllers/recog.controller.js";

const infoRouter = Router();

infoRouter.post("/isfriend", verifyJwt, isFriend);

// router.post('/isfriend', verifyJwt, isFriend);

export {infoRouter};