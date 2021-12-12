const mongoose = require('mongoose')

const checkoutSchema = new mongoose.Schema({
    user_Schema: {type: 'string',required: true},
    book_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"book",
        required: true,
        unique: true

    }
},{
    versionKey:true,
    timestamps:true
})

module.exports = mongoose.model('checkout',checkoutSchema)