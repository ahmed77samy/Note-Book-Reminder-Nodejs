const registerController = {}


registerController.getRegister = function (req, res) {
  res.render('register')
}
registerController.postRegister = function () {}



module.exports = registerController