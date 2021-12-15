const express = require('express');
const mongoose = require('mongoose')

const connect = require("./configs/db")

const evaluationsController = require("./controllers/evaluation.controller")

const studentsController = require("./controllers/student.controller")

const  topicsController = require("./controllers/topic.controller")

const  usersController = require("./controllers/user.controller")




const app = express();

app.use(express.json());

app.use("/users", usersController)

app.use("/students", studentsController)

app.use("/topics", topicsController)

app.use("evaluations", evaluationsController)

const start = async () =>{
    await connect
   app.listen(6789, ()=>{
    console.log("Listening at port 2456");
   })
}



module.exports = start