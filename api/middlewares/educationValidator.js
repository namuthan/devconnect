const validator = require("validator");
const isEmpty = require("../utils/is-empty");

module.exports = (req, res, next) => {
  let errors = {};

  req.body.school = !isEmpty(req.body.school) ? req.body.school : "";
  req.body.degree = !isEmpty(req.body.degree) ? req.body.degree : "";
  req.body.from = !isEmpty(req.body.from) ? req.body.from : "";
  req.body.fieldofstudy = !isEmpty(req.body.fieldofstudy)
    ? req.body.fieldofstudy
    : "";
  req.body.to = !isEmpty(req.body.to) ? req.body.to : "";

  if (validator.isEmpty(req.body.school)) {
    errors.school = "School field is required";
  }
  if (validator.isEmpty(req.body.degree)) {
    errors.degree = "Degree field is required";
  }
  if (validator.isEmpty(req.body.from)) {
    errors.from = "From date field is required";
  }
  if (validator.isEmpty(req.body.fieldofstudy)) {
    errors.fieldofstudy = "Field of study date field is required";
  }

  if (!req.body.current && validator.isEmpty(req.body.to)) {
    errors.to = "To date field is required when current job is not checked";
  }

  if (isEmpty(errors)) {
    return next();
  }

  return res.status(400).json(errors);
};
