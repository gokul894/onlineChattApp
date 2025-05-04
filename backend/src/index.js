
import { app } from "./app.js";
import { connectDb } from "./db/index.js";
import { config } from "./utils/config.js";

connectDb()
.then(() => {
    app.listen(config.port, ()=> {
        console.log('server start successfully')
    });
})
.catch(err => {
    console.log('db connection error in index.js', err)
})