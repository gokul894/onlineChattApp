
import { app } from "./app.js";
import { connectDb } from "./db/index.js";
import { config } from "./utils/config.js";

import {Server} from "socket.io"

connectDb()
.then(() => {
    const server = app.listen(config.port, ()=> {
        console.log('server start successfully')
    });

    // const io = new Server(server, );

})
.catch(err => {
    console.log('db connection error in index.js', err)
})