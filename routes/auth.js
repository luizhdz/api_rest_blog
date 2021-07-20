const express = require("express");
const router = express.Router();

var AuthController = require("../controllers/auth.js");

router
  .route("/user/login")
  .post(AuthController.login)
router
  .route("/user/register")
  .post(AuthController.register)

module.exports = router;
