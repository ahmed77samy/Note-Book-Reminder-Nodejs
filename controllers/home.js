const homeController = {};

homeController.getHome = function (req, res) {
  res.render('index')
};

module.exports = homeController;
