const { addNewBin } = require('../models/bin-models');
const { addNewNote, deleteNoteUser, updateNoteUser } = require('../models/note-models');

const noteController = {};

noteController.postNote = (req, res) => {
  req.body.created = new Date();
  req.body.userid = req.session.userid;
  addNewNote(req.body)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      res.redirect('/error');
      console.log(err);
    });
};

noteController.updateNote = (req, res) => {
  updateNoteUser(req.params.id, req.body)
    .then((data) => {
      res.end();
      console.log(data);
    })
    .catch((err) => {
      res.redirect('/error');
      console.log(err);
    });
};

noteController.deleteNote = (req, res) => {
  deleteNoteUser(req.params.id, req.session.userid)
    .then((data) => {
      let bin = {...data._doc}
      delete bin._id;
      delete bin.__v;
      return addNewBin(bin);
    })
    .then((data) => {
      res.end();
      console.log(data);
    })
    .catch((err) => {
      res.redirect('/error');
      console.log(err);
    });
};

module.exports = noteController;
