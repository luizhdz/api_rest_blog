var mongoose = require("mongoose");
const Category = require("../models/category.js");

//GET - Return all categorys in the DB
exports.findAllCategories = function (req, res) {
  Category.find(function (err, categories) {
    if (!err) {
      console.log("GET /categories");
      res.send(categories);
    } else {
      console.log("ERROR: " + err);
    }
  });
};

exports.findById = function (req, res) {
  Category.findById(req.params.id, function (err, categories) {
    if (err) return res.send(500, err.message);

    console.log("GET /categories/" + req.params.id);
    res.status(200).jsonp(categories);
  });
};

exports.createCategory = function (req, res) {
  try {
    var category = new Category({
      name: req.body.name
    });

    category.save(function (err) {
      if (!err) {
        console.log("Created");
      } else {
        console.log("ERROR: " + err);
      }
    });

    res.send(category);
  } catch (error) {
    console.log("Error:", error);
  }
};

exports.updateCategory = function (req, res) {
  Category.findById(req.params.id, function (err, categories) {
    categories.name = req.body.name;

    categories.save(function (err) {
      if (err) return res.status(500).send(err.message);
      res.status(200).jsonp(categories);
    });
  });
};

exports.deleteCategory = function (req, res) {
  Category.findById(req.params.id, function (err, categories) {
    categories.remove(function (err) {
      if (err) return res.status(500).send(err.message);
      res.status(200).send({message: "Category deleted"});
    });
  });
};
