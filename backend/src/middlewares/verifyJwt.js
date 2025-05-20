
import jwt from "jsonwebtoken";
import { config } from "../utils/config.js";

const verifyJwt = async (req, res, next) => {

    const accessToken = req.cookies?.accessToken || req.headers?.authorization?.replace('Bearer ', '');

    if(!accessToken) {
        return res.status(401)
        .json({
            "sms":"Not valide cookie !!",
            'accessToken':`you send me token ${accessToken}`
        })
    };

    const user = jwt.verify(accessToken, config.access_token_secret);

    if(!user){
        return res.status(401)
        .json({
            "sms":"Unauthorised access !!"
        });
    }

    req.User = user;

    next();

};

export {verifyJwt};