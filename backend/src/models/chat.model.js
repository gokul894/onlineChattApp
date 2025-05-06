
import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },

    receiver: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    content: {
        type:String,
        required: true
    },

    timestamp: {
        type:Date,
        default:Date.now
    }

}, {
    timestamps:true,
});


const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
