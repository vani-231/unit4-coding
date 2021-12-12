const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    first_name:{type: 'string',required: true},
    last_name:{type: 'string',required: true}
},{
    versionKey:true,
    timestamps:true
})

module.exports = mongoose.model('author',authorSchema)