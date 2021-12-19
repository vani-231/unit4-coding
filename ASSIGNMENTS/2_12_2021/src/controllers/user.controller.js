const express = require('express');

const {body,validationResult} = require('express-validator')

const User = require('../models/user.model')

const router = express.Router()

router.post('/',

body("first_name").notEmpty().withMessage("first_name is required"),
body("last_name").notEmpty().withMessage("last_name is required"),
body("email").custom(async (value) => {
    const userbyEmail = await User.findOne({ email: value}).lean().exec()
    if(userbyEmail){
        throw new Error("This email is already in use. Try with a different email address")

    } 


}).isEmail().withMessage("valid email is required"),
body("pincode").isLength({max:6}).withMessage("enter the 6 digit pincode"),
body("age").isLength({min:1,max:100}).withMessage("age should be in the range of 1 to 100"),
body("gender").custom((value)=>{
    if(value !== "male" && value!== "female" && value !== "others"){
        throw new Error("Please Enter Correct Gender")
    }
    return true
}),
async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const user = await User.create(req.body)
        return res.status(201).send(user)

    }
    catch(e){
        return res.status(500).send(e)

    }
})

module.exports = router