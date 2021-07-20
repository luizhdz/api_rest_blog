var mongoose = require("mongoose");
const User = require("../models/users.js");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const Joi = require("joi");

const schemaRegister = Joi.object({
  name: Joi.string().min(6).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

exports.register = async function (req, res) {
  // validate user
  const { error } = schemaRegister.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  User.findOne({ email: req.body.email }, async function (err, userFound) {
    if (err) return res.send(500, err.message);

    if (userFound) {
      return res.status(400).json({ error: "Email ya registrado" });
    } else {
      // hash contraseña
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);

      console.log("Salt", salt);
      console.log("Password", password);

      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password,
      });

      try {
        user.save(function (err, result) {
          console.log("Saved ? ", result);

          if (err) {
            res.status(400).json({ err });
          } else {
            res.json({
              error: null,
              data: result,
            });
          }
        });
      } catch (error) {
        res.status(400).json({ error });
      }
    }
  });
};

const schemaLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

exports.login = function (req, res) {
  // validaciones
  const { error } = schemaLogin.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  User.findOne({ email: req.body.email }, async function (err, userFound) {
    if (err) return res.send(500, err.message);
    if (!userFound)
      return res.status(400).json({ error: "Usuario no encontrado" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      userFound.password
    );

    if (!validPassword)
      return res.status(400).json({ error: "contraseña no válida" });

    // create token
    const token = jwt.sign(
      {
        name: userFound.name,
        id: userFound._id,
      },
      "TOKEN_SECRET"
    );

    res.header("auth-token", token).json({
      error: null,
      data: { token },
    });
  });
};
