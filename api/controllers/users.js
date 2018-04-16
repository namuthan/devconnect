const mongoose = require("mongoose");
const User = require("../models/User");
const usersUtils = require("../utils/users");

exports.registerNewUser = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user) {
        return res.status(400).json({
          email: "Email already exists!"
        });
      } else {
        usersUtils
          .newUser(req.body)
          .save()
          .then(user => {
            res.status(201).json(user);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
};
