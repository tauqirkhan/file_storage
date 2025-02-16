const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/sign-up");
  }
};

module.exports = checkAuthentication;
