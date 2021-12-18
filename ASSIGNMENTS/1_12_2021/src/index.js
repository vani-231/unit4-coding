const express = require('express')

const app = express()

app.use(express.json())

const userController = require("./controllers/user.controller")

const galleryController = require("./controllers/gallery.controller")

app.use('/users',userController)

app.use('/gallerys',galleryController)

module.exports = app