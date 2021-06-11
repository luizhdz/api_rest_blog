const express = require("express");
const router = express.Router();
const Blog = require("../models/blog.js");

router.get("/blogs", function (req, res) {
  console.log("GET: ")
  Blog.find(function(err, blogs) {
    if(!err) {
      console.log('GET /blogs')
      res.send(blogs);
    } else {
      console.log('ERROR: ' + err);
    }
  });
});

router.post("/blogs", function (req, res) {
  console.log('POST');
  console.log(req.body);

  try {
    var blog = new Blog({
      title:    req.body.title,
      autor:    req.body.autor,
      content:    req.body.content,
    });
  
    blog.save(function(err) {
      if(!err) {
        console.log('Created');
      } else {
        console.log('ERROR: ' + err);
      }
    });
  
    res.send(blog);
  } catch (error) {
    console.log("Error:" , error)
  }
  

});

router.put("/blogs/:id", function (req, res) {
  res.send({ type: "PUT" });
});
router.delete("/blogs/:id", function (req, res) {
  res.send({ type: "DELETE" });
});

module.exports = router;
