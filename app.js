const express = require("express");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})
app.get("/Login",function(req,res){
    res.sendFile(__dirname+"/Login.html")
})
app.get("/Register",function(req,res){
    res.sendFile(__dirname+"/Register.html")
})

app.post("/register",function(req,res){
    console.log(req.body);
    
    res.send("Registered Succesfully!");
})
app.post("/login",function(req,res){
    console.log(req.body);
    res.send("Log in Succesfull!");
})

app.listen(3000,function(req,res){
    console.log("Running on 3000");
})