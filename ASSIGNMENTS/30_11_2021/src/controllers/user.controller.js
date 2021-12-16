const express = require('express');

const User = require('../models/user.model')

const router = express.Router()

const sendMail = require("../utils/sendmail")

const admins = [
    "a@a.com",
    "b@b.com",
    "c@c.com",
    "d@d.com",
    "e@e.com"
]

const admins = admins.join(",")

router.post("/",async (req, res)=>{
    try{

        const user = await User.create(req.body)
        sendMail(
            "company@gmail.com",
            `${req.body.email}`,
            `Welcome to ABC system ${req.body.first_name} ${req.body.last_name}`,
            `Hi ${req.body.first_name}, Please confirm your email address`,
            `<h1>Hi ${req.body.first_name}, Please confirm your email address</h1>`
        );
        sendMail(
            `${req.body.email}`,
            admins,
            `Welcome to ABC system ${req.body.first_name} ${req.body.last_name}`,
            `Hi ${req.body.first_name} ${req.body.last_name} Has registered with us...!`,
            `<h1>Please Welcome ${req.body.first_name} ${req.body.last_name}</h1>`
        )
        return res.status(201).send(user);

    }
    catch(e){
        res.status(500).send({ message: e.message, status: 'failed' })
    }
})

router.get("/", async (req, res) => {
    try{
        const users = await User.find().lean().exec();
        return res.status(200).send(users)
    }catch(e){
        return res.status(500).json({ Status: "Failed", Message: e.message })
    }
})

module.exports = router

