const express = require("express");
const router = express.Router();
const passport = require("passport");

const profileController = require("../controllers/profile");
const profileValidator = require("../middlewares/profileValidator");
const experienceValidator = require("../middlewares/experienceValidator");
const educationValidator = require("../middlewares/educationValidator");

// @route GET api/profile
// @desc  Get current user profile
// @access Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileController.getCurrentUserProfile
);

// @route GET api/profile/all
// @desc  Get all profiles
// @access Public

router.get("/all", profileController.getAllProfiles);

// @route GET api/profile/handle/:handle
// @desc  Get user profile for a given handle
// @access Public

router.get("/handle/:handle", profileController.getUserWithHandle);

// @route GET api/profile/:id
// @desc  Get user profile for a user id
// @access Public

router.get("/user/:user_id", profileController.getProfileForUserWithId);

// @route POST api/profile
// @desc  Create/update user profile
// @access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileValidator,
  profileController.createNewProfile
);

// @route POST api/profile/experience
// @desc  Add experience to profile
// @access Private

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  experienceValidator,
  profileController.addExperience
);

// @route POST api/profile/education
// @desc  Add education to profile
// @access Private

router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  educationValidator,
  profileController.addEducation
);

module.exports = router;
