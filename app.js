var express = require("express");

var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var port = process.env.PORT || 4000;

var app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

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

var blogs = require("./routes/api");
var auth = require("./routes/auth");
var verifyToken = require('./routes/validate-token');

app.use("/auth", auth);
app.use("/api", verifyToken, blogs);

app.listen(port);
console.log("API escuchando en el puerto " + port);
