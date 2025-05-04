
import jwt from "jsonwebtoken";
import { config } from "../utils/config.js";

const verifyJwt = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    if(!accessToken) {
        return res.status(404)
        .json({
            "sms":"Unauthorised access !!"
        })
    };

    const user = await jwt.verify(accessToken, config.access_token_secret);

    if(!user){
        return res.status(404)
        .json({
            "sms":"Unauthorised access !!"
        });
    }

    req.User = user;

    next();

};

export {verifyJwt};