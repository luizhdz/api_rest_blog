var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var blog = new Schema({
  title: { type: String, required: [true, "Title field is required"] },
  autor: { type: String },
  content: { type: String, required: [true, 'Content field is required'] },
});

module.exports = mongoose.model("blog", blog);
