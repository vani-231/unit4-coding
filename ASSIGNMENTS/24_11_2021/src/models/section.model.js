const mongoose = require('mongoose')

const sectionSchema = new mongoose.Schema({
    book_id:[{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:"book",
        required:true
    }]
},{
    versionKey:true,
    timestamps:true
})

module.exports = mongoose.model("section",sectionSchema)