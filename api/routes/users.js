const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/users");

// @route GET api/users/register
// @desc  Register user
// @access Public

router.post("/register", userController.registerNewUser);

// @route GET api/users/login
// @desc  Login user / Returning newly created token
// @access Public

router.post("/login", userController.login);

//passport.authenticate("jwt", { session: false })

module.exports = router;
