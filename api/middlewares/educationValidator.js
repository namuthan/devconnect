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

  console.log(`school ${req.body.school}`);

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

  if (isEmpty(errors)) {
    return next();
  }

  return res.status(400).json(errors);
};
