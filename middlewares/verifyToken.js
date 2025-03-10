const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");
const httpStatusText = require("../utils/httpStatusText");

function verifyToken(req, res, next) {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];

  if (!authHeader) {
    const error = appError.create(
      "token is required",
      401,
      httpStatusText.ERROR
    );
    return next(error);
  }

  try {
    const token = authHeader.split(" ")[1];
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentUser = decodedUser;
    next();
  } catch (err) {
    const error = appError.create("invalid token", 401, httpStatusText.ERROR);
    return next(error);
  }
}

module.exports = verifyToken;
