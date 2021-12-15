const express = require('express')

const Topic = require('../models/topic.model')

const router = express.Router()

router.post('/',async (req, res)=>{
    try{
    const topic = await Topic.create(req.body);
      return res.status(201).send(topic)
    }
    catch(e){
         return   res.status(500).json({status:"Failed",message:e.message})
    }
})


router.get('/', async (req, res)=>{
    try{
    const topics = await Topic.find().lean().exec()
    //const topics = await Topic.find({email:"xyz@gmail.com"}).lean().exec()
        return res.send({topics})
    }
    catch(e){
          return res.status(500).json({status:"Failed",message:e.message})
    }
})


router.get('/:id', async (req,res)=>{
    try {
        const topic = await Topic.findById(req.params.id).lean().exec()
          return res.send({topic})        
    } catch (e) {
       return res.status(500).json({status:"Failed",message:e.message})
    }

})


router.patch('/:id', async (req,res)=>{
    try{
    const topic = await Topic.findByIdAndUpdate(req.params.id, req.body,{new:true}).lean().exec()
       return res.send({topic})
    }
    catch (e) {
        return res.status(500).json({status:"Failed",message:e.message})
    }
})


router.delete('/:id', async (req,res)=>{
    try {
        const topic = await Topic.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(200).send({topic})
        
    } catch (e) {
        return res.status(500).json({status:"Failed",message:e.message})
        
    }
})


module.exports = router



