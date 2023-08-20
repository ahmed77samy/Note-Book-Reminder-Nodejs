const { getUser } = require('../models/auth-models');
const { getBinUser, deleteBinUser, deleteAllBinUser } = require('../models/bin-models');

const binController = {};

binController.getBin = async function (req, res) {
  try {
    let notes = await getBinUser(req.session.userid);
    let user = await getUser(req.session.userid);
    res.render('bin', {
      notes,
      user,
    });
  } catch (error) {
    res.redirect('/error');
  }
};

binController.deleteBin = (req, res) => {
  deleteBinUser(req.params.id, req.session.userid)
    .then((data) => {
      res.end();
      console.log(data);
    })
    .catch((err) => {
      res.redirect('/error');
      console.log(err);
    });
};

binController.deleteAllBin = (req, res) => {
  deleteAllBinUser(req.session.userid)
    .then((data) => {
      res.end();
      console.log(data);
    })
    .catch((err) => {
      res.redirect('/error');
      console.log(err);
    });
};

module.exports = binController;
