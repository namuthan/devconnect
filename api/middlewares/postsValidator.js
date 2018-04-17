const validator = require("validator");
const isEmpty = require("../utils/is-empty");

module.exports = (req, res, next) => {
  let errors = {};

  req.body.text = !isEmpty(req.body.text) ? req.body.text : "";

  if (!validator.isLength(req.body.text, { min: 10, max: 300 })) {
    errors.text = "Post must be between 10 and 300 characters";
  }

  if (validator.isEmpty(req.body.text)) {
    errors.text = "Text field is required";
  }

  if (isEmpty(errors)) {
    return next();
  }

  return res.status(400).json(errors);
};
