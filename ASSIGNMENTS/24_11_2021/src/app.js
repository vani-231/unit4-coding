const express = require('express')

const connect = require("./config/db")

const authorscontroller = require('./controllers/author.controller')

const bookscontroller = require('./controllers/book.controller')

const checkoutcontroller = require('./controllers/checkout.controller')

const section = require('./controllers/section.controller')

const app = express()

app.use(express.json())

app.use("/authors",authorsController)

app.use("/books",bookscontroller)

app.use("/checkouts",checkoutcontroller)

app.use("/sections",sectionController)






const start = async () =>{
    await connect()
    app.listen(1432,()=>{
        console.log("Listening at 1432 port");
    })
}

module.exports = start