const mongoose = require("mongoose");
const User = require("../models/User");
const Profile = require("../models/Profile");

exports.getCurrentUserProfile = (req, res) => {
  const errros = {};

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (!profile) {
        errros.noprofile = "There is no profile for this user";
        return res.status(404).json(errros);
      }
      res.json(profile);
    })
    .catch(err => {
      console.log(err);
      res.status(404).json(err);
    });
};
