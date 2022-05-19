const express = require("express");
const bodyParser=require("body-parser");
const mongo = require('mongodb');
const app=express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
});
app.get("/Login",function(req,res){
    res.sendFile(__dirname+"/Login.html")
});
app.get("/Register",function(req,res){
    res.sendFile(__dirname+"/Register.html")
});

app.post("/register",function(req,res){
    console.log(req.body);
    var emailID=req.body.email;
    var password=req.body.password;
    var name=req.body.name;
    var age=req.body.age;
    var number=req.body.number
    var MongoClient=require('mongodb').MongoClient
    var url= "mongodb://127.0.0.1:27017/";
    MongoClient.connect(url,function(err,db){
        if(err) throw err;
        var dbo=db.db("Users");
        dbo.collection("Details").findOne({"email":emailID},function(err,result){
            if (err) throw err;
            if(result==null){
                dbo.collection("Details").insert({
                    "name":name,
                    "email":emailID,
                    "password":password,
                    "age":age,
                    "number":number
                 },function(err,result){
                     if (err) throw err;
                 });
                res.send("Registered Succesfully!");
            }
            else{
                res.send(emailID+" is already in use!");
            }
            console.log(result);
        });
        //db.close();
    });
   
    
});
app.post("/login",function(req,res){
    console.log(req.body);
    //res.send("Log in Succesfull!");
    var emailID=req.body.email;
    var password=req.body.password;
    var MongoClient=require('mongodb').MongoClient
    var url= "mongodb://127.0.0.1:27017/";
    MongoClient.connect(url,function(err,db){
        if(err) throw err;
        var dbo=db.db("Users");
        dbo.collection("Details").findOne({"email":emailID},function(err,result){
            if (err) throw err;
            if(result==null){
                res.send("Invalid Username or Password!");
            }
            else if(result.password==password){
                res.send("Logged In succesfully. Hello"+result.name);
            }
            else {
                res.send("Invalid Password or Username");
            }
            console.log(result);
        });
        //db.close();
    });
});

app.listen(3000,function(req,res){
    console.log("Running on 3000");
});