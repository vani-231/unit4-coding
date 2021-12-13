const mongoose = require('mongoose')

const showSchema = new mongoose.Schema({
    timing:{type:Number,required:true},
    movie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"movies",
        required:true
    },
    total_seats:{type:Number,required:true},
    screen:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"screens",
        required:true
    }
})

const Show = mongoose.model("show",showSchema)

module.exports = Show