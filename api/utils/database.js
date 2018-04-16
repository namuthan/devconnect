const mongoose = require("mongoose");
const User = require("../models/User");

exports.connect = url => {
  return new Promise((resolve, reject) => {
    mongoose.connect(url, {}, function(error) {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
};
