
import { app } from "./app.js";
import { connectDb } from "./db/index.js";
import { initSocket } from "./sockets/index.js";
import { config } from "./utils/config.js";
import http from "http";

const server = http.createServer(app);

connectDb()
.then(() => {
    
    initSocket(server);

    server.listen(config.port, () => {
        console.log('server start successfully');
    });

})
.catch(err => {
    console.log('db connection error in index.js', err)
})