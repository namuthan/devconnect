const validator = require("validator");
const isEmpty = require("../utils/is-empty");

module.exports = (req, res, next) => {
  let errors = {};

  req.body.title = !isEmpty(req.body.title) ? req.body.title : "";
  req.body.company = !isEmpty(req.body.company) ? req.body.company : "";
  req.body.from = !isEmpty(req.body.from) ? req.body.from : "";
  req.body.to = !isEmpty(req.body.to) ? req.body.to : "";

  if (validator.isEmpty(req.body.title)) {
    errors.title = "Job title field is required";
  }
  if (validator.isEmpty(req.body.company)) {
    errors.company = "Company field is required";
  }
  if (validator.isEmpty(req.body.from)) {
    errors.from = "From date field is required";
  }

  if (!req.body.current && validator.isEmpty(req.body.to)) {
    errors.to = "To date field is required when current job is not checked";
  }

  if (isEmpty(errors)) {
    return next();
  }

  return res.status(400).json(errors);
};
