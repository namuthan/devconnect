const mongoose = require("mongoose");
const User = require("../models/User");
const Profile = require("../models/Profile");
const profileUtils = require("../utils/profile");

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

exports.createNewProfile = (req, res) => {
  const profileFields = profileUtils.getProfileInfoFromRequest(req);

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      // Update

      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then(profile => res.json(profile));
    } else {
      // Create

      // Check if handle exists
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          req.errors.handle = "That handle already exists";
          res.status(400).json(req.errors);
        }

        // save profile
        new Profile(profileFields)
          .save()
          .then(profile => res.json(profile))
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      });
    }
  });
};
