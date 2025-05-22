import User from "../models/user.model";

const isFriend = async (req, res) => {

    const getUser = await User.findOne({email:req.body?.email}).select('-password -refreshToken');

    if(getUser?.id){
        return res.status(200).json({
            friend:getUser
        });
    }

    return res.status(200).json({
        friend:null
    });

}

export {isFriend};