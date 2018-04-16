const validator = require("validator");
const isEmpty = require("../utils/is-empty");

module.exports = (req, res, next) => {
  let errors = {};

  req.body.name = !isEmpty(req.body.name) ? req.body.name : "";
  req.body.email = !isEmpty(req.body.email) ? req.body.email : "";
  req.body.password = !isEmpty(req.body.password) ? req.body.password : "";
  req.body.password2 = !isEmpty(req.body.password2) ? req.body.password2 : "";

  // name validations
  if (!validator.isLength(req.body.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }
  if (validator.isEmpty(req.body.name)) {
    errors.name = "Name field is required";
  }

  // email validations
  if (!validator.isEmail(req.body.email)) {
    errors.email = "Email is invalid";
  }
  if (validator.isEmpty(req.body.email)) {
    errors.email = "Email field is required";
  }

  // password validatiosn
  if (validator.isEmpty(req.body.password)) {
    errors.password = "Password field is required";
  }
  if (!validator.isLength(req.body.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters";
  }

  // confirm password validations
  if (!validator.equals(req.body.password, req.body.password2)) {
    errors.password2 = "Passwords must match";
  }
  if (validator.isEmpty(req.body.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  if (isEmpty(errors)) {
    return next();
  }

  return res.status(400).json(errors);
};
