const express = require("express");
const router = express.Router();
const passport = require("passport");

const profileController = require("../controllers/profile");
const profileValidator = require("../middlewares/profileValidator");

// @route GET api/profile
// @desc  Get current user profile
// @access Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileController.getCurrentUserProfile
);

// @route GET api/profile
// @desc  Create/update user profile
// @access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileValidator,
  profileController.createNewProfile
);

module.exports = router;
