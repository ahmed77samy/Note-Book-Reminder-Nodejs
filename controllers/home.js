const { getUser } = require('../models/auth-models');
const { getNoteUser } = require('../models/note-models');

const homeController = {};

homeController.getHome = async function (req, res) {
  try {
    let notes = await getNoteUser(req.session.userid);
    let user = await getUser(req.session.userid);
    res.render('index', {
      notes,
      user,
    });
  } catch (error) {
    res.redirect('/error');
  }
};

module.exports = homeController;
