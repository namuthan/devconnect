const User = require("../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

exports.newUser = payload => {
  const avatar = gravatar.url(payload.email, {
    s: "200", // Size
    r: "pg", // Rating,
    d: "mm" // Default
  });
  var newUser = new User({
    name: payload.name,
    email: payload.email,
    avatar
  });
  newUser.password = newUser.generateHash(payload.password);
  return newUser;
};
