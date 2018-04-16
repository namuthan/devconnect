const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

// @route GET api/users/register
// @desc  Register user
// @access Public

router.post("/register", userController.registerNewUser);

module.exports = router;
