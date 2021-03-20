//jshint esversion:6

const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

//for local file to use while local hosting
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    var firstName=req.body.fname;
    var lastName=req.body.lname;
    var email=req.body.email;
   // res.send("<h1>post received</h1>");
    console.log(firstName, lastName, email );
});


app.listen(3000,function(){
    console.log("server is running on port 3000");
});