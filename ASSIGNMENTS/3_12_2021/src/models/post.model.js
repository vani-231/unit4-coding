const {Schema,model} = require('mongoose')
const mongoose = require('mongoose')

const postSchema = new Schema({
    title:{type:String,required: true,required: true},
    body:{type:String,required: true,required: true},
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true
    }
})

mongoose.exports = model('post', postSchema)