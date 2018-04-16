const mongoose = require("mongoose");
const User = require("../models/User");
const usersUtils = require("../utils/users");
const utils = require("../utils/util");

exports.registerNewUser = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user) {
        return res.status(400).json({
          email: "Email already exists!"
        });
      }

      usersUtils
        .newUser(req.body)
        .then(user => {
          return utils.combineDataWithPromise(
            user,
            usersUtils.generateHashedPassword(req.body.password),
            "user",
            "hashedPassword"
          );
        })
        .then(data => {
          const { user, hashedPassword } = data;
          user.password = hashedPassword;
          return user.save();
        })
        .then(user => {
          res.status(201).json(user);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // find user by email

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: "User not found" });
      } else {
        return usersUtils.validatePassword(password, user.password);
      }
    })
    .then(isValid => {
      if (!isValid) {
        return res.status(400).json({ password: "Incorrect password" });
      } else {
        res.json({ msg: "success" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};
