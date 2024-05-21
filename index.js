const express = require('express')
const fs = require("fs");
const { resolve } = require('path');
require("dotenv").config
const app = express()
const port = process.env.PORT || 3000;


app.use(express.json())
app.use(express.urlencoded())

app.get('/',function(req,res){
    res.send("Hello World")
})

app.get('/html',(req,res)=>{
    res.send("<h1>This is My http server</h1>")}
)

app.get("/peopledata",(req,res)=>{
    let people = [{name:"ram",age:21,gender:"male"},{name:"abhi",age:20,gender:"other"},{name:"king",age:100,gender:"male"}]
    let peopleJson = JSON.stringify(people) // prettyfying
    res.send(peopleJson)
})

app.get("/json",(req,res)=>{
    res.json({messege:"this is an api route"})
})

app.get("/greet/:name",(req,res)=>{
    const {name} = req.params;
    res.send(`Hello dear ${name}`)
})

//*can be anything abajdsflakjd
app.get("/ab*d",(req,res)=>res.send("ab*d"))

//matches anything which has "a" in it
app.get(/a/,(req,res)=>res.send("/a/"))

const content = []
app.post("/addData",(req,res)=>{
    const newContent = req.body.data;
    if(!newContent){
       return res.status(400).json({error:"content is required"})
       //early return 
    }   
    function Writing(){
        return new Promise((resolve)=>{
            fs.writeFile("a.txt",newContent,(data)=>{
            })
            resolve("writing done")
        })
    }
    Writing().then((data)=>console.log(data))
    content.push(newContent)
    res.status(200).json({messege:"content added successfully"})
})


app.get("/content",(req,res)=>res.send(content))


app.listen(port,()=>{
    console.log(`server running on ${port}`)
})