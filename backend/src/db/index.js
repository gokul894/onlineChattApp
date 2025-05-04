import mongoose from "mongoose";
import { config } from "../utils/config.js";
import { DB_NAME } from "../contant.js";

const connectDb = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${config.db_url}/${DB_NAME}`);
        console.log('db connected at ',connectionInstance.connection.host);
    } catch (error) {
        console.log('db connection error ', error)
    }
};

export {connectDb};
