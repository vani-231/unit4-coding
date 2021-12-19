const connect = require('./configs/db')

const app = require('./index')

app.listen('7856',async ()=>{
    await connect()
    console.log("Listening at port 7856");
})
