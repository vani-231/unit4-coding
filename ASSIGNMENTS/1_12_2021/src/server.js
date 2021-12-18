const app = require('./index')

const connect = require('./configs/db')

app.listen(3890,async ()=>{
    await connect()
    console.log("Listening at Port 3890");
})

