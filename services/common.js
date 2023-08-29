exports.filterUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.isAuth = (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    res.status(401).json("Unauthorized");
  }
};
