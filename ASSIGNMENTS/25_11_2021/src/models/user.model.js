const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name:{type: String,required: true},
    last_name:{type: String,required: false},
    gender:{type: String,required: true,default: 'male'},
    date_of_birth:{type: Number,required: true}
},{
    versionKey:false,
    timestamps: true
})

const User = mongoose.model('user',userSchema)//users collections

module.exports = User