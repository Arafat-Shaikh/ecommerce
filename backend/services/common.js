const passport = require("passport");

exports.filterUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.isAuth = () => {
  return passport.authenticate("jwt");
};

exports.cookieExtract = function (req, res) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};
