const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/users");
const registerValidator = require("../middlewares/registerValidator");
const loginValidator = require("../middlewares/loginValidator");

// @route GET api/users/login
// @desc  Login user / Returning newly created token
// @access Public

router.get("/", userController.getAllUsers);

// @route GET api/users/register
// @desc  Register user
// @access Public

router.post("/register", registerValidator, userController.registerNewUser);

// @route GET api/users/login
// @desc  Login user / Returning newly created token
// @access Public

router.post("/login", loginValidator, userController.login);

module.exports = router;
