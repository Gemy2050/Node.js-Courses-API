const appError = require("../utils/appError");

module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      return next(
        appError.create("you are not allowed to do this action", 403)
      );
    }
    next();
  };
};
