const validator = require("validator");
const isEmpty = require("../utils/is-empty");

module.exports = (req, res, next) => {
  let errors = {};

  req.body.title = !isEmpty(req.body.title) ? req.body.title : "";
  req.body.company = !isEmpty(req.body.company) ? req.body.company : "";
  req.body.from = !isEmpty(req.body.from) ? req.body.from : "";

  if (validator.isEmpty(req.body.title)) {
    errors.title = "Job title field is required";
  }
  if (validator.isEmpty(req.body.company)) {
    errors.company = "Company field is required";
  }
  if (validator.isEmpty(req.body.from)) {
    errors.from = "From date field is required";
  }

  if (isEmpty(errors)) {
    return next();
  }

  return res.status(400).json(errors);
};
