const express = require('express')

const router = express.Router()

const Gallery = require("../models/gallery.model")

const upload = require("../middlewares/upload")

router.post('/',upload.single("gallery"), async (req,res)=>{
    try{
    const files = req.files.map((file)=>file.path)
    const gallery = await Gallery.create({
        pictures: files,
        user_id: req.body.user_id
    })
    return res.status(200).json({ gallery })
}catch(e){
    return res.status(500).json({ status: "failed", message: e.message })
}
})

router.get("/", async(req, res) => {
    try{
        const gallery = await Gallery.find().populate("user_id").lean().exec();
        return res.status(201).json({gallery})
    }catch(e){
        return res.status(500).json({ status: "failed", message: e.message })
    }
})


module.exports = router