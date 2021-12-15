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


const User = mongoose.model("user", userSchema);//users collection


app.use(express.json())




const postSchema = new mongoose.Schema({
    title:{type:String, required:true},
    body:{type:String, required:true},
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user", 
        required:true
    },
    tag_id:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"tag",
        required:true
    }]
},{
    versionKey:false,
    timestamps:true,
})

const Post = mongoose.model("post", postSchema);//posts collection



//one comment one post --> many comments one post so one to many relationship



const commentSchema = new mongoose.Schema({
    body:{type:String, required:true},
    user_id:{
        type:mongoose.Schema.Types.Object,
        ref:"user",
        required:true
    },
    post_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post",
        required:true
    }
    
},{
    versionKey:false,
    timestamps:true,
})

const Comment = mongoose.model("comment",commentSchema) // comments collection

//Tag schema is posts and tags many to many relationship

const tagSchema = new mongoose.Schema({
    name:{type:String, required:true}
},{
    versionKey:false,
    timestamps:true,
})

const Tag = mongoose.model("tag",tagSchema)




//const User = mongoose.model("task",userSchema)


/*
tasks
post = /tasks 
get all = /tasks
get one = /tasks/:id
update one = /tasks/:id
delete one = /tasks/:id
*/

//-------------------------------------users CURD API-------------------------------------------------

app.post('/users',async (req, res)=>{
    try{
    const user = await User.create(req.body);
      return res.status(201).send(user)
    }
    catch(e){
         return   res.status(500).json({status:e.message})
    }
})


app.get('/users', async (req, res)=>{
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


//-------------------------------------------Tags CURD API-----------------------------------------------


app.post('/tags', async (req,res)=>{
    try{
        const tag = await Tag.create(req.body);
        return res.status(200).send({tag})

    }
    catch (e) {
        return res.status(500).json({status:e.message})
    }
})

app.get('/tags',async (req,res)=>{
    try {
        const tags = await Tag.find().lean().exec()
        return res.status(200).send({tags})
    } catch (e) {
        return res.status(500).json({status:e.message})
        
    }
})

app.get('/tags/:id', async (req, res)=>{
    try {
        const tag = await Tag.findById(req.params.id).lean().exec();
        return res.status(200).send({tag})        
    } catch (e) {
        return res.status(500).json({status:e.message})
    }
})


app.patch('/tags/:id', async (req, res)=>{
    try {
        const tag = await Tag.findByIdAndUpdate(req.params.id, req.body,{new:true}).lean().exec();
        return res.status(200).send({tag})
        
    } catch (e) {
        return res.status(500).json({status:e.message})
    }
})


app.delete('/tags/:id', async (req, res)=>{
    try {
        const tag = await Tag.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send({tag})
    } catch (e) {
        return res.status(500).json({status:e.message})
    }
})



///----------------------------------POSTS CURD API---------------------------------------------

app.post('/posts', async (req, res)=>{
    try {
        const post = await Post.create(req.body)
        return res.status(201).send({post})
    } catch (e) {
        return res.status(500).json({status:e.message})     
    }
})

app.get('/posts',async (req, res)=>{
    try {
        const posts = await Post.find().populate({path:"user_id",select:"first_name"}).populate("tag_id").lean().exec()
        return res.send({posts})
    } catch (e) {
        return res.status(500).json({status:e.message})
    }
})


app.get('/posts/:id', async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id).lean().exec();
        return res.status(200).send({post})
    } catch (e) {
        return res.status(500).json({status:e.message})
    }
})

app.patch('/posts/:id', async (req, res)=>{
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body,{new:true}).lean().exec()
        return res.status(200).send({post})
    } catch (e) {
        return res.status(500).json({status:e.message})
    }
})

app.delete('/posts/:id',async (req, res)=>{
    try {
        const post = await Post.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(200).json({post})
    } catch (e) {
        return res.status(500).json({status:e.message})
    }
})


//-------------------------------------------COMMENTS CURD API---------------------------------------


app.post('/tags', async (req,res)=>{
    try{
        const tag = await Tag.create(req.body);
        return res.status(200).send({tag})

    }
    catch (e) {
        return res.status(500).json({status:e.message})
    }
})

app.get('/tags',async (req,res)=>{
    try {
        const tags = await Tag.find().lean().exec()
        return res.status(200).send({tags})
    } catch (e) {
        return res.status(500).json({status:e.message})
        
    }
})

app.get('/tags/:id', async (req, res)=>{
    try {
        const tag = await Tag.findById(req.params.id).lean().exec();
        return res.status(200).send({tag})        
    } catch (e) {
        return res.status(500).json({status:e.message})
    }
})


app.patch('/tags/:id', async (req, res)=>{
    try {
        const tag = await Tag.findByIdAndUpdate(req.params.id, req.body,{new:true}).lean().exec();
        return res.status(200).send({tag})
        
    } catch (e) {
        return res.status(500).json({status:e.message})
    }
})


app.delete('/tags/:id', async (req, res)=>{
    try {
        const tag = await Tag.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send({tag})
    } catch (e) {
        return res.status(500).json({status:e.message})
    }
})


app.get('/tags/:id/posts', async (req, res)=>{
     try {
         const tag = await Tag.findById(req.params.id).lean().exec()
         const post = await Post.find({tag_id:tag._id}).lean().exec()
         return res.status(200).send({post,tag})
     } catch (e) {
         return res.status(500).json({status:e.message})
     }
})



///----------------------------------POSTS CURD API---------------------------------------------

app.post('/comments', async (req, res)=>{
    try {
        const comment = await Comment.create(req.body)
        return res.status(201).send({comment})
    } catch (e) {
        return res.status(500).json({status:e.message})     
    }
})

app.get('/comments',async (req, res)=>{
    try {
        const comments = await Comment.find().lean().exec()
        return res.send({comments})
    } catch (e) {
        return res.status(500).json({status:e.message})
    }
})


app.get('/comments/:id', async (req, res)=>{
    try {
        const comment = await Comment.findById(req.params.id).lean().exec();
        return res.status(200).send({comment})
    } catch (e) {
        return res.status(500).json({status:e.message})
    }
})

app.patch('/comments/:id', async (req, res)=>{
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body,{new:true}).lean().exec()
        return res.status(200).send({comment})
    } catch (e) {
        return res.status(500).json({status:e.message})
    }
})

app.delete('/comments/:id',async (req, res)=>{
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(200).json({comment})
    } catch (e) {
        return res.status(500).json({status:e.message})
    }
})






app.listen(5436, async function() {
    await connect();
    console.log("Listening at port 5436");
})