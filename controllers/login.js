const loginController = {};

loginController.getLogin = function (req, res) {
  res.render('login');
};
loginController.postLogin = function () {};

module.exports = loginController;
