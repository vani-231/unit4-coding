const User = require("../models/user.model")

const jwt = require("jsonwebtoken")

require("dotenv").config()


const newToken = (user) => {
    return jwt.sign({ user: user}, process.env.JWT_ACCESS_KEY)
}

const register = async (req, res) => {
    
    try{
        
        // check if email already exist
        let user = await User.findOne({email: req.body.email}).lean().exec()
        
        // if exist throw err
        if(user) 
            return res
                .status(400)
                .json({status: "failed", 
                    message: "please provide different email address"
                })

        // else we will create the user // we will hash the password as plain text pass is harmfull
        user = await User.create(req.body)
    
        // we will create the token
        const token = newToken(user)
    
        // return the user and token
        res.status(201).json({ user, token })
    
}catch(e){
    return res.status(500).json({status: "failed", message: e.message})
}
}

const login = async (req, res) => {

    try{
        // check if email is already exist
        let user = await User.findOne({ email: req.body.email })

        // if dose not exist throw err
        if(!user) 
        return res
                .status(400)
                .json({status: "failed", 
                    message: "please provide different email address"
                })

        // else we match the password
        const match = await user.checkPassword(req.body.password)
        // if not match throw err

        if(!match) 
        return res
                .status(400)
                .json({status: "failed", 
                    message: "please provide correct email address and password"
                });

        // if matches then create token
        const token = newToken(user)

        // return user
        return res.status(201).json({ user, token })
    }catch(e){
        return res.status(500).json({status: "failed", message: e.message})
    }
}


module.exports = {
    register,
    login
}