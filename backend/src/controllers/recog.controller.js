import User from "../models/user.model.js";

const isFriend = async (req, res) => {
    // console.log('im in recog controller',req.body);
    const getUser = await User.findOne({email:req.body?.email}).select('-password -refreshToken');
    console.log('recog',getUser);

    if(getUser?._id){
        return res.status(200).json({
            friend:getUser
        });
    }

    return res.status(200).json({
        friend:null
    });

}

export {isFriend};