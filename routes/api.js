const express = require("express");
const blog = express.Router();
var BlogsController = require('../controllers/blogs.js');

blog.route("/blogs")
  .get(BlogsController.findAllBlogs)
  .post(BlogsController.createBlogs);

blog.route('/blogs/:id')
  .get(BlogsController.findById)
  .put(BlogsController.updateBlogs)
  .delete(BlogsController.deleteBlog);

module.exports = blog;
