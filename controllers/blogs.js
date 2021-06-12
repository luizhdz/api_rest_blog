var mongoose = require("mongoose");
const Blog = require("../models/blog.js");

//GET - Return all blogs in the DB
exports.findAllBlogs = function (req, res) {
  Blog.find(function (err, blogs) {
    if (!err) {
      console.log("GET /blogs");
      res.send(blogs);
    } else {
      console.log("ERROR: " + err);
    }
  });
};

exports.findById = function (req, res) {
  Blog.findById(req.params.id, function (err, blog) {
    if (err) return res.send(500, err.message);

    console.log("GET /blog/" + req.params.id);
    res.status(200).jsonp(blog);
  });
};

exports.createBlogs = function (req, res) {
  try {
    var blog = new Blog({
      title: req.body.title,
      autor: req.body.autor,
      content: req.body.content,
    });

    blog.save(function (err) {
      if (!err) {
        console.log("Created");
      } else {
        console.log("ERROR: " + err);
      }
    });

    res.send(blog);
  } catch (error) {
    console.log("Error:", error);
  }
};

exports.updateBlogs = function (req, res) {
  Blog.findById(req.params.id, function (err, blog) {
    blog.title = req.body.title;
    blog.autor = req.body.autor;
    blog.content = req.body.content;

    blog.save(function (err) {
      if (err) return res.status(500).send(err.message);
      res.status(200).jsonp(blog);
    });
  });
};

exports.deleteBlog = function (req, res) {
  Blog.findById(req.params.id, function (err, blog) {
    blog.remove(function (err) {
      if (err) return res.status(500).send(err.message);
      res.status(200).send({message: "blog deleted"});
    });
  });
};
