const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");


const app = express();

app.use(express.static("public")); //public is a path; to refer to the static files
//to render or apply .css files and img to the app 

app.use(bodyParser.urlencoded({extended:true})); 
//to get body-parser module to work


app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    var firstName = req.body.first;
    var lastName = req.body.last;
    var email = req.body.email;
    console.log(firstName, lastName, email);
})

app.listen(3000, function(){
    console.log("server is running on port 3000");
})