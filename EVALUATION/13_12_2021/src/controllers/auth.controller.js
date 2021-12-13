const User = require('../models/user.model')

const jwt = require('jsonwebtoken');
require('dotenv').config();
const { validationResult } = require('express-validator');


const newToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_ACCESS_KEY);
}


const register = async (req, res) => {

    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const newErrors = errors.array().map(({ param, msg }) => {
            return { [param]: msg };
        });
        return res.status(400).json({ errors: newErrors });
    }


    try {

        
        let user = await User.findOne({ email: req.body.email }).lean().exec();

        
        if (user) {
            return res.status(400).json({ message: "Email address already present", status: 'failed' });
        }

        
        user = await User.create(req.body);

        
        const token = newToken(user);

        
        return res.status(201).json({ user: user, token: token });

    } catch (err) {
        res.status(500).send({ message: err.message, status: 'failed' });
    }

}


const login = async (req, res) => {

    // check for input errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const newErrors = errors.array().map(({ param, msg }) => {
            return { [param]: msg };
        });
        return res.status(400).json({ errors: newErrors });
    }



    try {

        let { email, password } = req.body;

        // check if user exits or not
        let user = await User.findOne({ email });

        // If your user not found send err
        if (!user) {
            return res.status(401).send({ message: "Email or password incorrect", status: 'failed' });
        }

        // Match password with hashPass
        const match = await user.checkPassword(password);

        if (!match) {
            return res.status(401).send({ message: "Email or password incorrect", status: 'failed' });
        }

        // If password matches then create token for user_id
        const token = newToken(user);

        // send token
        return res.json({ user, token });

    } catch (err) {
        res.status(500).send({ message: err.message, status: 'failed' });
    }
}

module.exports = { register, login };