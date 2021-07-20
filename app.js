var express = require("express");

var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var port = process.env.PORT || 4000;

var app = express();

// cors
const cors = require('cors');
var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

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
