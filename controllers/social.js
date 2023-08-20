const { getUser } = require('../models/auth-models');
const { getNotePublic } = require('../models/note-models');

const socialController = {};

socialController.getSocial = async function (req, res) {
  try {
    let data = await getNotePublic(req.query.page);
    for (const note of data) {
      let user = await getUser(note.userid);
      note.user = user;
    }
    let user = await getUser(req.session.userid);
    res.render('social', {
      notes: data,
      user: user,
      query: {
        page: req.query.page,
      },
    });
  } catch (err) {
    res.redirect('/error');
  }
};

module.exports = socialController;
