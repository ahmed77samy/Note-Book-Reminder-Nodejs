const mongoose = require('mongoose');
const env = require('../config/env-config');

const DBURL = env.DBURL;
const binModels = {};

const binSchema = mongoose.Schema({
  noteBody: {
    type: String,
    require: true,
  },
  created: {
    type: Date,
    require: true,
  },
  userid: {
    type: mongoose.Schema.ObjectId,
    require: true,
  },
});

const BIN = mongoose.model('bin', binSchema);

binModels.addNewBin = function (bin) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DBURL)
      .then(() => {
        let newbin = new BIN(bin);
        return newbin.save();
      })
      .then((data) => {
        mongoose.disconnect();
        resolve(data);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

binModels.getBinUser = function (userid) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DBURL)
      .then(() => {
        return BIN.find({ userid: userid });
      })
      .then((data) => {
        mongoose.disconnect();
        resolve(data);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

binModels.deleteBinUser = function (id, userid) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DBURL)
      .then(() => {
        return BIN.deleteOne({ _id: id, userid: userid });
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

binModels.deleteAllBinUser = function (userid) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DBURL)
      .then(() => {
        return BIN.deleteMany({ userid: userid });
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = binModels;
