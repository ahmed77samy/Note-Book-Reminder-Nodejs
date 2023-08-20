const mongoose = require('mongoose');
const env = require('../config/env-config');

const DBURL = env.DBURL;
const noteModel = {};

const noteSchema = mongoose.Schema({
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
  user: {
    type: Object,
    require: true,
  },
  privacy: {
    type: String,
    require: true,
    default: 'private',
  },
});

const NOTE = mongoose.model('note', noteSchema);

noteModel.addNewNote = function (data) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DBURL)
      .then(() => {
        let newnote = new NOTE(data);
        return newnote.save();
      })
      .then(() => {
        mongoose.disconnect();
        resolve();
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

noteModel.getNoteUser = function (userid) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DBURL)
      .then(() => {
        return NOTE.find({ userid: userid }).sort({ created: -1 });
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

noteModel.updateNoteUser = function (id, data) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DBURL)
      .then(() => {
        return NOTE.findOne({ _id: id });
      })
      .then((note) => {
        let newnote = {
          ...note._doc,
          ...data,
        };
        return NOTE.updateOne({ _id: id }, newnote);
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

noteModel.deleteNoteUser = function (id, userid) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DBURL)
      .then(() => {
        return NOTE.findOneAndDelete({ _id: id, userid: userid });
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

noteModel.getNotePublic = function (page) {
  let limit = 12;
  let skip = parseInt(page - 1) * limit;
  let limited = page * limit;
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DBURL)
      .then(() => {
        return NOTE.find({ privacy: 'public' }).sort({ created: -1 }).skip(skip).limit(limited);
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

module.exports = noteModel;
