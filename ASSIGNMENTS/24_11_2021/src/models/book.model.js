const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name:{type: 'string',required: true},
    body:{type: 'string',required: true},
    author_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"author",
        required: true,
    }
},{
    versionKey:true,
    timestamps:true
})

module.exports = mongoose.model('book',bookSchema)