const mongoose = require('mongoose')

const seatSchema = new mongoose.Schema({
    show:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"show",
        required: true
    }
})

const Seats = mongoose.model("seats",seatSchema)

module.exports = Seats