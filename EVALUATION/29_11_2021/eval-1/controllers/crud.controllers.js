const post = (model) => async (req,res)=>{
    const item = await model.create(req.body);
    return  res.status(201).send({item});
}

const get = (model) => async (req,res)=>{
    const item = await model.find().lean().exec();
    return res.status(200).send({item});
}

const patch = (model) => async (req,res)=>{
    const item = await model.findById(req.params)
}