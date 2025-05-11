import mongoose from "mongoose";

const chatgroupSchema = mongoose.Schema({
    chats:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat"
    }],
}, {timestamps: true});

const Chatgroup = mongoose.model('Chatgroup', chatgroupSchema);

export default Chatgroup;