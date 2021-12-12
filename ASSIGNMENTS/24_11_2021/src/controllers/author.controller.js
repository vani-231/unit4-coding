const express = require('express')

const Author = require('../models/author.model')

const router = express.Router()


router.post("/",async (req, res) => {
    try{

        const author = await Author.create(req.body)
        return res.status(201).send(author)

    }
    catch(e){
        return res.status(500).json({status:e.message});
    }
})


router.get('/', async (req, res) => {
    try{
        const authors = await Author.find().lean().exec()
        return res.status(201).send(authors)
    }
    catch(e){
        return res.status(500).json({status:e.message}); 
    }
})

router.get('/:id',async (req, res) => {
    try{
        const author = await Author.findById(req.params.id).lean().exec();
        return res.status(201).send(author)
    }
    catch(e){
        return res.status(500).json({status:e.message}); 

    }
})

router.patch('/:id', async (req, res) => {
    try{
        const author = await Author.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
        return res.status(201).send(author)
    }
    catch(e){
        return res.status(500).json({status:e.message}); 
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const author = await Author.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(author)

    }
    catch(e){
        return res.status(500).json({status:e.message}); 
    }
})

module.exports = router