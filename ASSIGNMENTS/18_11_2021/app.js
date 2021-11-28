const express = require('express')

const app = express();

const books = require('./books.json');

//app.use(express.json());

const logger = (req, res, next) => {
    req.name = "vani";
    next()
}

app.use(logger)



app.get("/", (req,res, next) => {
    // const newUser = [...books, req.body]
    // const postIt = res.send(newUser)
    
    //   or    //
    // next()
    // res.send(req.name, books)
    // res.json({"Requestd_by": req.name})
    res.send({books})

});

app.post('/books', (req, res) => {
    const newUser = [...books,req.body]
    res.send(newUser)
})

app.get('/books/:id', (req, res) => {
    const newBook = req.params.id
    res.send({books})
})

app.patch("/:id", (req, res) => {
    const newBooks = books.map((book) => {
        if(req.params.id === book.id){
            if(req?.body?.id) book.id = req.body.id;
            if(req?.body?.author) book.author = req.body.author;
            if(req?.body?.book_name) book.book_name = req.body.book_name;
            if(req?.body?.pages) book.pages = req.body.pages;
            if(req?.body?.published_year) book.published_year = req.body.published_year;
        }
        return book;
    })
    res.send(newBooks)
})



app.delete("/books/:id", (req, res) => {
    const newBooks = books.filter((book) => book.id !== req.params.id)
    res.send(newBooks)
})




app.listen(1345, function () {
    console.log("Listening at 1345 port");
})