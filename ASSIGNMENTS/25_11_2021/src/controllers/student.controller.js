const express = require('express')

const Student = require('../models/student.model')

const router = express.Router()

router.post('/',async (req, res)=>{
    try{
    const student = await Student.create(req.body);
      return res.status(201).send(student)
    }
    catch(e){
         return   res.status(500).json({status:"Failed",message:e.message})
    }
})


router.get('/', async (req, res)=>{
    try{
    const students = await Student.find().lean().exec()
    //const topics = await Topic.find({email:"xyz@gmail.com"}).lean().exec()
        return res.send({students})
    }
    catch(e){
          return res.status(500).json({status:"Failed",message:e.message})
    }
})


router.get('/:id', async (req,res)=>{
    try {
        const student = await Student.findById(req.params.id).lean().exec()
          return res.send({student})        
    } catch (e) {
       return res.status(500).json({status:"Failed",message:e.message})
    }

})


router.patch('/:id', async (req,res)=>{
    try{
    const student = await Student.findByIdAndUpdate(req.params.id, req.body,{new:true}).lean().exec()
       return res.send({student})
    }
    catch (e) {
        return res.status(500).json({status:"Failed",message:e.message})
    }
})


router.delete('/:id', async (req,res)=>{
    try {
        const student = await Student.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(200).send({student})
        
    } catch (e) {
        return res.status(500).json({status:"Failed",message:e.message})
        
    }
})


module.exports = router



