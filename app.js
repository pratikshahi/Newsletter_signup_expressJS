//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

//for local file to use while local hosting
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const lastName = req.body.lname;
    const firstName = req.body.fname;
    const email = req.body.email;
    // res.send("<h1>post received</h1>");
    //console.log(firstName, lastName, email );

    //data is in javascrip ,have to convert to JSON to send to mailchimp
    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };
    var jsonData = JSON.stringify(data);
    const url="https://us1.api.mailchimp.com/3.0/lists/5aaadc4180";
    const options={
        method:"POST",
        auth: "pratik:394d37195adb3acebdc99c2a4030490a-us1"
    };
    const request=https.request(url,options,function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+"/sucess.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

});

app.post("/failure",function(req,res){
    res.redirect("/");
});

//changing port 3000 to process.env.PORT for heroku to host
app.listen(process.env.PORT || 3000, function () {
    console.log("server is running on port 3000");
});

//apikey 394d37195adb3acebdc99c2a4030490a-us1
//list id 5aaadc4180