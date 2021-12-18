const express = require('express')

const router = express.Router()

const User = require('../models/users.model')

const upload = require("../middlewares/upload")

const fs = require('fs')


router.post('/',upload.single("profile_pic"),async (req, res) => {
    try{
        const user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            profile_pic: req.file.path
        })
        return res.status(200).json({ user})
    }
    catch(e){
        return res.status(500).json({ status: "failed", message: e.message})
    }
})


router.patch('/:id',upload.single("profile_pic"), async (req, res) => {
    try{
        const user = await User.findById(req.params.id)

        await fs.unlink(`$(user.profile_pic)`, (err) => {
            if (err) throw err;
        });
        const updateuser = await User.findByIdAndUpdate(req.params.id,{
            profile_pic:req.file.path
        }).lean().exec()
    }catch(e){
        return res.status(500).json({status:"Failed",message:e.message})

    }
})


router.delete('/:id', async (req, res) => {
    try {
        
        const user = await User.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(200).json({user})
    } catch (e) {
        return res.status(500).json({status:"Failed",message:e.message})
    }
})

router.get('/', async(req, res)=>{
    try {
        const users = await User.find().lean().exec()
        return res.status(200).json({users}) 
    } catch (e) {
        return res.status(500).json({status:"Failed",message})
    }
})

module.exports = router