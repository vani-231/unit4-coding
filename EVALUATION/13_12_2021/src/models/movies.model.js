const mongoose = require('mongoose')

const MoviesSchema = new mongoose.Schema({
    name:{type: String,required: true},
    actors:[{
        type: String ,required: true
    }],
    languages:[{
        type: String,required: true
    }],
    directors:[{
        type: String,required: true
    }],
    poster_url:{type: String,required: true}

},{
    versionKey:true,
    timestamps:true
})

const Movie = mongoose.model("movie",MoviesSchema)

module.exports = Movie