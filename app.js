var express = require("express");

var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var port = process.env.PORT || 4000;

var app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/blogs", function (err, res) {
  if (err) {
    console.log("ERROR: connecting to Database. " + err);
  } else {
    console.log("Connected to Database");
  }
});

var router = require("./routes/api");
app.use("/api", router);

app.listen(port);
console.log("API escuchando en el puerto " + port);
