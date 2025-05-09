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
}))


app.use('/api/auth', router)

export {app};
