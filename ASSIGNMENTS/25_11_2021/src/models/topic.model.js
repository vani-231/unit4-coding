const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
    name:{type: String,required: true}
},{
    versionKey:false,
    timestamps: true
})

const Topic = mongoose.model('topic',topicSchema)//topics collections

module.exports = Topic