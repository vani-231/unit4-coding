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
