const express = require('express')


//console.log(express);
const app = express();

app.use(express.json())
const users = require('./users.json');

app.get('/',(req,res)=>{
   res.send({users});
    //res.send("<h1>hello</h1>")
   //res.send("<script>alert('Hello world!')</script>")
})

app.post('/',(req,res)=>{
    const newUser = [...users,req.body]
    res.send(newUser);
})

app.patch('/:email',(req,res)=>{
    // console.log(req.params.id);
    // console.log(req.params.email);
    // res.send("Patch")

    const newUsers = users.map((user)=>{
        if(req.params.email === user.email){
            //return req.body;
            if(req?.body?.first_name)user.first_name = req.body.first_name;
            if(req?.body?.last_name)user.last_name = req.body.last_name;
            if(req?.body?.email)user.email = req.body.email;
            if(req?.body?.gender)user.gender = req.body.gender;

        }

        return user;
    })
    res.send(newUsers);

})

app.delete("/:email",(req, res) => {
    const newUsers = users.filter((user)=>user.email  !== req.params.email)
    res.send(newUsers);
})

app.get("/:email",(req, res) => {
    const newUsers = users.filter((user)=>user.email  === req.params.email)
    res.send(newUsers);
})




app.listen(2345, function(){
    console.log("Listening on port 2345");
})