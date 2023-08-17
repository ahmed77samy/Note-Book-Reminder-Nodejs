const resetPasswordController = {};

resetPasswordController.getResetPassword = function (req, res) {
  res.render('reset-password');
};
resetPasswordController.postResetPassword = function () {};

module.exports = resetPasswordController;
