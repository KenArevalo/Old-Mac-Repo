// jshint esversion: 6
//Newsletter
// Line 4-11 Template

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
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

  const jsonDATA = JSON.stringify(data);

// Problem with URL below

  const url = "https://us10.api.mailchimp.com/lists/1a72a1645d/members/0035dacd355acc12c6c0051bf86eb3f0-us10/notes";

  const options = {
    method: "POST",
    auth: "kenneth1:0035dacd355acc12c6c0051bf86eb3f0-us10"
  }

  const request = https.request(url, options, function (response) {

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonDATA);
  request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

// API Key
// 0035dacd355acc12c6c0051bf86eb3f0-us10

// Audience
// 1a72a1645d
