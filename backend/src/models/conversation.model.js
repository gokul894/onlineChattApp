
import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        }
    ],

    lastMessage: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat"
    },

}, { timestamps: true});


conversationSchema.index({ participants:1 }, { unique:true });


const conversation = mongoose.model('Conversation', conversationSchema);

export default conversation;
