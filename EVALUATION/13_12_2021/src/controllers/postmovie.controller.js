const express = require('express');

const router = express.Router();

const Movie = require('../models/movies.model')

const upload = require('../middlewares/upload')

router.post('/',upload.single("poster_url"), async (req, res) => {
    try{
        const movie = await Movie.create({
            name: req.body.name, 
            actors: req.body.email,
            languages: req.body.password, 
            directors : req.body.roles,
            poster_url: req.file.path
        })
        return res.status(201).json({newmovie: movie})
    }
    catch(e){
        return res.status(500).json({status:e.message})
    }
})

module.exports = router