const express = require("express");
const router = express.Router();
var BlogsController = require("../controllers/blogs.js");
var CategoriesController = require("../controllers/categories.js");

router
  .route("/blogs")
  .get(BlogsController.findAllBlogs)
  .post(BlogsController.createBlogs);

router
  .route("/blogs/:id")
  .get(BlogsController.findById)
  .put(BlogsController.updateBlogs)
  .delete(BlogsController.deleteBlog);

router
  .route("/categories")
  .get(CategoriesController.findAllCategories)
  .post(CategoriesController.createCategory);

router
  .route("/categories/:id")
  .get(CategoriesController.findById)
  .put(CategoriesController.updateCategory)
  .delete(CategoriesController.deleteCategory);

module.exports = router;
