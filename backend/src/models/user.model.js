
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../utils/config.js";

const userSchema = mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    refreshToken:{
        type:String,
        default:""
    }
}, {timestamps:true});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    };
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};


userSchema.methods.generateAccessToken = async function () {

    return await jwt.sign(
        {
        _id:this._id, 
        username:this.username, 
        email:this.email
        }, 

        config.access_token_secret,

        { expiresIn:config.access_token_expiry }
    );
};

userSchema.methods.generateRefreshToken = async function () {
    return await jwt.sign({
        _id:this._id
    }, 
        config.refresh_token_secret, 
        {expiresIn:config.refresh_token_expiry}
    );
};

const User = mongoose.model("User", userSchema);

export default User;