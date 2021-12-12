const express = require('express');

const mongoose = require('mongoose');

const app = express();

const connect = ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/first")
}

const userSchema = new mongoose.Schema({
    first_name :{type:String, required:true},
    last_name :{type:String, required:false},
    email :{type:String, required:true, unique:true},
    gender :{type:String, required:false, default:"Male"}, 
    age:{type:Number, required:true}
},{
    versionKey:false,
    timestamps:true,
})


const User = mongoose.model("task", userSchema);


app.use(express.json())


//const User = mongoose.model("task",userSchema)


/*
tasks
post = /tasks 
get all = /tasks
get one = /tasks/:id
update one = /tasks/:id
delete one = /tasks/:id
*/

app.post('/tasks',async (req, res)=>{
    try{
    const user = await User.create(req.body);
      return res.status(201).send(user)
    }
    catch(e){
         return   res.status(500).json({status:e.message})
    }
})


app.get('/tasks', async (req, res)=>{
    try{
    const users = await User.find().lean().exec()
    //const users = await User.find({email:"xyz@gmail.com"}).lean().exec()
        return res.send({users})
    }
    catch(e){
          return res.status(500).json({status:e.message})
    }
})


app.get('/tasks/:id', async (req,res)=>{
    try {
        const user = await User.findById(req.params.id).lean().exec()
          return res.send({user})        
    } catch (e) {
       return res.status(500).json({status:e.message})
    }

})


app.patch('/tasks/:id', async (req,res)=>{
    try{
    const user = await User.findByIdAndUpdate(req.params.id, req.body,{new:true}).lean().exec()
       return res.send({user})
    }
    catch (e) {
        return res.status(500).json({status:e.message})
    }
})


app.delete('/tasks/:id', async (req,res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(200).send(user)
        
    } catch (e) {
        return res.status(500).json({status:e.message})
        
    }
})


app.listen(5436, async function() {
    await connect();
    console.log("Listening at port 5436");
})