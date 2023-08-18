const authModel = require('../models/auth-models');
const validationResult = require('express-validator').validationResult;

const authenticationController = {};

authenticationController.getRegister = function (req, res) {
  res.render('register', {
    DBauthErrRegister: req.flash('DBauthErrRegister'),
    EXVauthErrRegister: req.flash('EXVauthErrRegister'),
  });
};

authenticationController.postRegister = function (req, res) {
  if (validationResult(req).isEmpty()) {
    authModel
      .addNewUser(req.body)
      .then(() => {
        req.flash('registerStatus', 'Account Is Created Please Login Now');
        res.redirect('/login');
      })
      .catch((err) => {
        req.flash('DBauthErrRegister', err);
        res.redirect('/register');
      });
  } else {
    req.flash('EXVauthErrRegister', validationResult(req).errors);
    res.redirect('/register');
  }
};

authenticationController.getLogin = function (req, res) {
  res.render('login', {
    DBauthErrLogin: req.flash('DBauthErrLogin'),
    registerStatus: req.flash('registerStatus'),
    EXVauthErrLogin: req.flash('EXVauthErrLogin'),
  });
};

authenticationController.postLogin = function (req, res) {
  if (validationResult(req).isEmpty()) {
    authModel
      .loginUser(req.body)
      .then((id) => {
        req.session.userid = id;
        res.redirect('/');
      })
      .catch((err) => {
        req.flash('DBauthErrLogin', err);
        res.redirect('/login');
      });
  } else {
    req.flash('EXVauthErrLogin', validationResult(req).errors);
    res.redirect('/login');
  }
};

authenticationController.getResetPassword = function (req, res) {
  res.render('reset-password');
};
authenticationController.postResetPassword = function () {};

authenticationController.logout = function (req, res) {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

module.exports = authenticationController;
