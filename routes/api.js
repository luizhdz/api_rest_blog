const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

router.get("/blogs", function (req, res) {
  Blog.find({})
    .then(function (blogs) {
      res.send(blogs);
    })
    .catch(next);
});

router.post("/blogs", function (req, res) {
  Blog.create(req.body)
    .then(function (blog) {
      res.send(blog);
    })
    .catch(next);
});

router.put("/blogs/:id", function (req, res) {
  res.send({ type: "PUT" });
});
router.delete("/blogs/:id", function (req, res) {
  res.send({ type: "DELETE" });
});

module.exports = router;
