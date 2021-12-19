const express = require('express')



const Post = require('../models/post.model')

const authenticate = require('../middlewares/authenticate')

const router = express.Router()

router.post("/",authenticate,async (req, res) => {
    try {
        const user = req.user
        console.log("user: " , user);
        const post = await Post.create({
            title:req.body.title,
            body:req.body.body,
            user:user.user_id
        })
        return res.status(201).json({post})
    } catch (e) {
        return res.status(500).json({ status: "failed", message: "something went wrong"})
    }
})

router.get("/",async (req, res) => {
    const posts = await Post.find().lean().exec()
    res.send(posts)
})

module.exports = router