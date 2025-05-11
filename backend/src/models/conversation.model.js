
import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            unique:true
        }
    ],

    chatGroupRef:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chatgroup",
        default:"0"
    }

}, { timestamps: true});



const conversation = mongoose.model('Conversation', conversationSchema);

export default conversation;


