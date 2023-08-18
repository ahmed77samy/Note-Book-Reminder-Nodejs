const isUser = (req, res, next) => (req.session.userid ? next() : res.redirect('/login'));
const isGuest = (req, res, next) => (req.session.userid ? res.redirect('/') : next());

module.exports = {
  isUser,
  isGuest,
};
