const withoutAuth = (req, res, next) => {
    if (req.session.logged_in) {
      res.redirect('/');
    } else {
      next();
    }
  };
  
  module.exports = withoutAuth;