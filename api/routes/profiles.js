const express = require("express");
const router = express.Router();
const passport = require("passport");

const profileController = require("../controllers/profile");

// @route GET api/profile
// @desc  Get current user profile
// @access Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileController.getCurrentUserProfile
);

module.exports = router;
