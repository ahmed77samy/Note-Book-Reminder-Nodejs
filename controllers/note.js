const { getUser } = require('../models/auth-models');
const { addNewBin } = require('../models/bin-models');
const { addNewNote, deleteNoteUser, updateNoteUser } = require('../models/note-models');

const noteController = {};

noteController.postNote = async (req, res) => {
  let user = await getUser(req.session.userid);
  req.body.created = new Date();
  req.body.userid = req.session.userid;
  req.body.user = user;
  addNewNote(req.body)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      res.redirect('/error');
    });
};

noteController.updateNote = (req, res) => {
  updateNoteUser(req.params.id, req.body)
    .then((data) => {
      res.end();
    })
    .catch((err) => {
      res.redirect('/error');
    });
};

noteController.deleteNote = (req, res) => {
  deleteNoteUser(req.params.id, req.session.userid)
    .then((data) => {
      let bin = { ...data._doc };
      delete bin._id;
      delete bin.__v;
      return addNewBin(bin);
    })
    .then((data) => {
      res.end();
    })
    .catch((err) => {
      res.redirect('/error');
    });
};

module.exports = noteController;
