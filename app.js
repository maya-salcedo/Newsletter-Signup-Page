const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https"); //to post back data to external resource



const app = express();

app.use(express.static("public")); //public is a path; to refer to the static files
//to render or apply .css files and img to the app 

app.use(bodyParser.urlencoded({extended:true})); 
//to get body-parser module to work


app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    const firstName = req.body.first;
    const lastName = req.body.last;
    const email = req.body.email;
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }

        ]
    };
//mailchimp: members is an array; email_address, status, merge_fields, FNAME, LNAME are keys
//var data is javascript

    const jsonData = JSON.stringify(data);
//to convert javascript object to flatpack json or string
// jsonData is what we going to send to mailchimp

    const url = "https://us7.api.mailchimp.com/3.0/lists/b9c6dc0897";
    //https://mailchimp.com/developer/marketing/guides/create-your-first-audience/#create-an-audience
    //b9c6dc0897 is a list id generated from mailchimp
    //replace $API_SERVER with the 3 end characters of my API key, eg. us7

    const options = {
        method: "POST",
        auth: "maya1:ad796219496b7ee9f6db24cbe6f2ff65-us7" 
    };
    //is a js object
    // method - https method
    //auth - htpps; key(any string): APIkey

    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
        //https.request - to request data from mailchip
        //response.on - to see data they send back to us
        //JSON.parse to parse the data we get
    });
    //to post back data to external resource
    //nodejs.org api http method

    request.write(jsonData);
    //to pass the jsonData to mailchimp server
    request.end();
    //to specify that we are done with the request
})


app.listen(3000, function(){
    console.log("server is running on port 3000");
})

//API key ad796219496b7ee9f6db24cbe6f2ff65-us7
//List Id b9c6dc0897

