const validator = require("validator");
const isEmpty = require("../utils/is-empty");

module.exports = (req, res, next) => {
  let errors = {};

  req.body.handle = !isEmpty(req.body.handle) ? req.body.handle : "";
  req.body.status = !isEmpty(req.body.status) ? req.body.status : "";
  req.body.skills = !isEmpty(req.body.skills) ? req.body.skills : "";

  // Handle
  if (!validator.isLength(req.body.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to be between 2 and 40 characters";
  }
  if (validator.isEmpty(req.body.handle)) {
    errors.handle = "Profile handle field is required";
  }

  // Status
  if (validator.isEmpty(req.body.status)) {
    errors.status = "Status field is required";
  }

  // Skills
  if (validator.isEmpty(req.body.skills)) {
    errors.skills = "Skills field is required";
  }

  // Website + Socials
  if (!isEmpty(req.body.website)) {
    if (!validator.isURL(req.body.website)) {
      errors.website = "Not a valid website url";
    }
  }
  if (!isEmpty(req.body.youtube)) {
    if (!validator.isURL(req.body.youtube)) {
      errors.youtube = "Not a valid youtube url";
    }
  }
  if (!isEmpty(req.body.twitter)) {
    if (!validator.isURL(req.body.twitter)) {
      errors.twitter = "Not a valid twitter url";
    }
  }
  if (!isEmpty(req.body.facebook)) {
    if (!validator.isURL(req.body.facebook)) {
      errors.facebook = "Not a valid facebook url";
    }
  }
  if (!isEmpty(req.body.linkedin)) {
    if (!validator.isURL(req.body.linkedin)) {
      errors.linkedin = "Not a valid linkedin url";
    }
  }
  if (!isEmpty(req.body.instagram)) {
    if (!validator.isURL(req.body.instagram)) {
      errors.instagram = "Not a valid instagram url";
    }
  }

  if (isEmpty(errors)) {
    req.errors = {};
    return next();
  }

  return res.status(400).json(errors);
};
