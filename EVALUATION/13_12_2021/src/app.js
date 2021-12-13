const express = require('express');


const connect = require("./config/db")

const app = express()


const userController = require('./controllers/user.controller');
const postController = require('./controllers/post.controller');
const { register, login } = require('./controllers/auth.controller');
const { body } = require('express-validator');

app.use(express.json());

app.use('/register',
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Proper email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    register);

app.use('/login', body('email').isEmail().withMessage('Proper email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    login);


app.use('/users', userController);
app.use('/posts', postController);









const start = async ()=>{
    await connect()

    app.listen(2314,function(){
        console.log("Listening on port 2314")
    })
}

module.exports = start