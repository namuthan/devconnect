const mongoose = require("mongoose");
const User = require("../models/User");
const Profile = require("../models/Profile");
const profileUtils = require("../utils/profile");

exports.getCurrentUserProfile = (req, res) => {
  const errros = {};

  Profile.findOne({ user: req.user.id })
    .select("-__v")
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errros.noprofile = "There is no profile for this user";
        return res.status(404).json(errros);
      }
      res.json(profile);
    })
    .catch(err => {
      errros.noprofile = "There is no profile for this user";
      return res.status(404).json(errros);
    });
};

exports.getUserWithHandle = (req, res) => {
  const errros = {};

  Profile.findOne({ handle: req.params.handle })
    .select("-__v")
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errros.noprofile = "There is no profile for this handle";
        return res.status(404).json(errros);
      }
      res.json(profile);
    })
    .catch(err => {
      console.log(err);
      errros.noprofile = "There is no profile for this handle";
      return res.status(404).json(errros);
    });
};

exports.getProfileForUserWithId = (req, res) => {
  const errros = {};

  Profile.findOne({ user: req.params.user_id })
    .select("-__v")
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errros.noprofile = "There is no profile for this user";
        return res.status(404).json(errros);
      }
      res.json(profile);
    })
    .catch(err => {
      console.log(err);
      errros.noprofile = "There is no profile for this user";
      return res.status(404).json(errros);
    });
};

exports.getAllProfiles = (req, res) => {
  const errros = {};

  Profile.find()
    .select("-__v")
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      res.json({
        count: profiles.length,
        profiles: profiles
      });
    })
    .catch(err => {
      console.log(err);
      errros.noprofile = "There are no profiles";
      return res.status(404).json(errros);
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

exports.addExperience = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    const newExp = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };

    profile.experience.unshift(newExp);
    profile
      .save()
      .then(profile => res.json(profile))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
};

exports.addEducation = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    const newEducation = {
      school: req.body.school,
      degree: req.body.degree,
      fieldofstudy: req.body.fieldofstudy,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };

    profile.education.unshift(newEducation);
    profile
      .save()
      .then(profile => res.json(profile))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
};

exports.deleteExperience = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Get remove index
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

      if (removeIndex >= 0) {
        // Splice out of array
        profile.experience.splice(removeIndex, 1);
      }

      //Save
      return profile.save();
    })
    .then(updatedProfile => res.json(updatedProfile))
    .catch(err => {
      console.log(err);
      res.status(404).json(err);
    });
};

exports.deleteEducation = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Get remove index
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);

      if (removeIndex >= 0) {
        // Splice out of array
        profile.education.splice(removeIndex, 1);
      }

      //Save
      return profile.save();
    })
    .then(updatedProfile => res.json(updatedProfile))
    .catch(err => {
      console.log(err);
      res.status(404).json(err);
    });
};

exports.deleteUserAndProfile = (req, res) => {
  Profile.findByIdAndRemove({ user: req.user.id }).then(() => {
    User.findByIdAndRemove(req.user.id).then(() => res.json({ success: true }));
  });
};
