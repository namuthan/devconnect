const mongoose = require("mongoose");

exports.connect = url => {
  return new Promise(function(resolve, reject) {
    mongoose.connect(url, {}, function(error) {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
};
