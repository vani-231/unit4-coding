const express = require('express');
const mongoose = require('mongoose')
 
const app = express();



const connect = require("./configure/db");


const user = require("./models/companies.model")

const jobSchema =  new mongoose.Schema({
    city:{type: String,required: true},
    skill:{type: String,required: true},
    location_type:{type: String,required: true},
    ratings:{type: Number,required: true},
    notice_period:{type: String,required: true},
    no_of_jobs:{type: Number,required: true}
}, {
    versionKey:false,
    timestamps:true
}
);

const Job = mongoose.model("job",jobSchema);

app.use(express.json());

app.post('/jobs',async(req, res)=>{
    try {
        const job = await Job.create(req.body);
        res.status(201).send(job)
        
    } catch (e) {
        res.status(500).send({status:e.message})
        
    }
});

app.get("/jobs/:city/:skill", async (req, res) => {
    try{
        const jobs = await Job.find({"city": {$eq: req.params.city}, "skill": {$eq: req.params.skill}}).lean().exec();
        return res.status(201).send({ jobs })
    }catch(e){
        return res.status(500).json({ status: e.message })
    }
})

app.get("/jobs/:location_type", async(req, res) => {
    try{
        const jobs = await Job.find({"location_type": {$eq: "Work from home"}}).lean().exec();
        return res.status(201).send({ jobs })
    }catch(e){
        return res.status(500).json({ status: e.message })
    }
})

app.get("/jobs/:notice_period", async(req, res) => {
    try{
        const jobs = await Job.find({"notice_period": {$eq: req.params.notice_period}}).lean().exec();
        return res.status(201).send({ jobs })
    }catch(e){
        return res.status(500).json({ status: e.message })
    }
})

app.get("/jobs/ratings", async(req, res) => {
    try{
        const jobs = await Job.find().sort({ratings:-1}).lean().exec();
        return res.status(201).send({ jobs })
    }catch(e){
        return res.status(500).json({ status: e.message })
    }
})

app.get("/jobs/no_of_jobs", async(req, res) => {
    try{
        const num = await Job.find({"no_of_jobs": {$eq: 43}}).lean().exec();
        return res.status(201).send({ num})
    }catch(e){
        return res.status(500).json({ status: e.message })
    }
})



app.get("/",async(req, res)=>{
    const jobs = await Job.find().lean().exec()
    res.send({jobs})

})





app.listen(4325,async function() {
     await connect();
     console.log("Listening at port 4325");
})