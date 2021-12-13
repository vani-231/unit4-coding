const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');
const authenticate = require('../middlewares/authenticate');

router.get('/', authenticate, async(req, res) => {
    try{
        const tokenUser = req.user;

    
        const posts = await Post.find({user: tokenUser.user._id}).lean().exec();
    
        return res.send(posts);

    } catch(err) {
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});

router.post('/', authenticate, async(req, res) => {
    try{
        const tokenUser = req.user;
    
        const posts = await Post.create({
            title: req.body.title,
            body: req.body.body,
            user: tokenUser.user._id,
        });
    
        return res.send(posts);

    } catch(err) {
        return res.status(500).send({message: err.message, status: 'failed'});
    }
});

module.exports = router;