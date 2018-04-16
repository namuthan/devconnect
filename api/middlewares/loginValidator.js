const validator = require("validator");
const isEmpty = require("../utils/is-empty");

module.exports = (req, res, next) => {
  let errors = {};

  req.body.email = !isEmpty(req.body.email) ? req.body.email : "";
  req.body.password = !isEmpty(req.body.password) ? req.body.password : "";

  // email validations
  if (!validator.isEmail(req.body.email)) {
    errors.email = "Email is invalid";
  }
  if (validator.isEmpty(req.body.email)) {
    errors.email = "Email field is required";
  }

  // password validations
  if (validator.isEmpty(req.body.password)) {
    errors.password = "Password field is required";
  }

  if (isEmpty(errors)) {
    return next();
  }

  return res.status(400).json(errors);
};
