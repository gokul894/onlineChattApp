//app.js
import express from "express";
import { router } from "./routes/auth.route.js";
import cors from "cors"
import { config } from "./utils/config.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))

app.use(cors({
    origin:config.cors_url,
    credentials:true,
    methods:['POST'],
    exposedHeaders:['Authorization'],
    allowedHeaders: ['Authorization', 'Content-Type'],
}))


app.use('/api/auth', router);
app.use('/api/sms', router);
app.use('/api/recognize', router);

export {app};
