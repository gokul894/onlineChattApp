import User from "../models/user.model.js";


const ragister = async (req, res) => {
    const {fullName, username, email, password, confirmPass} = req.body;

    if(!fullName || !username || !email || !password || !confirmPass){
        return res.status(404).json({
            "msg":"Please fill required field !!"
        })
    };

    if(password !== confirmPass){
        return res.status(404).json({
            "msg":"Provide all creads"
        })
    };

    const user = await User.findOne({
        $or:[{username}, {email}]
    });

    if(user){
        return res.status(403).json({
            "msg":"User already exist"
        })
    };

    const newUser = await User({
        fullName,
        username,
        email,
        password
    });

    if(!newUser){
        return res.status(502).json({
            "msg":"Not user created"
        })
    };

    await newUser.save()

    return res.status(200)
    .json({
        "msg":"user created successfully"
    })

};

const login = async (req, res) => {
    const {usernameOremail, password} = req.body;
    // console.log({usernameOremail, password})

    if(!usernameOremail || !password){
        return res.status(403).json({
            "msg":"Please fill required field !!"
        });
    };


    const user = await User.findOne({
        $or:[{username:usernameOremail},{ mail: usernameOremail }]
    });
    

    if(!user){
        return res.status(401).json({
            "sms":"Invalide creadential !!"
        });
    };

    const validatePass =  await user.isPasswordCorrect(password);

    
    if(!validatePass){
        return res.status(401).json({
            "sms":"Invalide creadential !!"
        });
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    // console.log(accessToken, refreshToken)

    user.refreshToken = refreshToken;

    await user.save({validate:false});

    res
    .status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json({
        "sms":"login successfull",
        "AuthUser":{
            id:user._id,
            fullname:user.fullName,
            email:user.email,
            username:user.username,
        }
    });
};

const logout = async (req, res) => {
    const user = req.User;
    const requestedUser = await User.findById(user._id);

    if(!requestedUser){
        return res.status(404)
        .json({
            "sms":"Unauthorised access !!"
        });
    };

    // .cookie("accessToken", accessToken)
    // .cookie("refreshToken", refreshToken)
    requestedUser.refreshToken = "";

    await requestedUser.save({validate:false})

    res.status(200)
    .clearCookie('accessToken')
    .clearCookie('refreshToken')
    .json({
        "msg":"User logout seccessfully"
    });
};



export {ragister, login, logout};


