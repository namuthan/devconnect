const User = require("../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

exports.newUser = payload => {
  return new Promise((resolve, reject) => {
    const avatar = gravatar.url(payload.email, {
      s: "200", // Size
      r: "pg", // Rating,
      d: "mm" // Default
    });
    const newUser = new User({
      name: payload.name,
      email: payload.email,
      avatar
    });

    resolve(newUser);
  });
};

exports.generateHashedPassword = password => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return reject(err);

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return reject(err);

        resolve(hash);
      });
    });
  });
};

exports.validatePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
