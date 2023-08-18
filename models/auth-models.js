const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const env = require('../config/env-config');

const DBURL = env.DBURL;
const authModel = {};

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name Is Required'],
    },
    email: {
      type: String,
      required: [true, 'Email Is Required'],
      lowercase: true,
      index: { unique: [true, 'This Email Is Already Exists'] },
    },
    password: {
      type: String,
      required: [true, 'Password Is Required'],
    },
  },
  { timestamps: true }
);

const User = mongoose.model('user', userSchema);

authModel.addNewUser = function (userdata) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DBURL)
      .then(() => {
        return User.find({ email: userdata.email });
      })
      .then((user) => {
        if (user.length !== 0) {
          mongoose.disconnect();
          reject('This Email Is Already Exists');
        }
        if (userdata.password) {
          return bcrypt.hash(userdata.password, 10);
        }
      })
      .then((hashed) => {
        userdata.password = hashed;
        let user = new User(userdata);
        return user.save();
      })
      .then((data) => {
        mongoose.disconnect();
        resolve(data);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject('An Error Occurred');
      });
  });
};

authModel.loginUser = function (userdata) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DBURL)
      .then(() => {
        return User.find({ email: userdata.email });
      })
      .then((user) => {
        if (user.length == 0) {
          mongoose.disconnect();
          reject('Email Is Not Found');
        } else {
          bcrypt.compare(userdata.password, user[0].password).then((same) => {
            if (same) {
              mongoose.disconnect();
              resolve(user[0]._id);
            } else {
              mongoose.disconnect();
              reject('Password Not Correct');
            }
          });
        }
      })
      .catch((err) => {
        mongoose.disconnect();
        reject('An Error Occurred');
      });
  });
};
module.exports = authModel;
