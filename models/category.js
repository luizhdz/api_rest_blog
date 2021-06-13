var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var category = new Schema({
  name: { type: String, required: [true, "Category field is required"] },
});

module.exports = mongoose.model("category", category);
