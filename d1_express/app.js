const express = require('express');
const app = express();
app.use(express.json());
const users = require('./users.json');

app.get('/', (req, res) => {
    res.send("Welcome to Home page")
    
})

app.get('/users',(req, res) => {
    res.send({users})
})


// app.get('/users', (req,res) =>  {
//     const newUser = [...users, req.body]
//     res.send(newUser)
// })





app.listen(1234, ()=>{
    console.log("Listening on port 124")
})

