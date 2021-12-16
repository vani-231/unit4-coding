const app = require('./index')

const connect = require("./configs/db")



app.use(express.json())



app.listen(3789,async function() {
     await connect()
    console.log("runnning at 3789");
})