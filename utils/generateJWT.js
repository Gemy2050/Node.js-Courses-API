const jwt = require("jsonwebtoken");

function generateJWT(user) {
  return jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: "1m" });
}

module.exports = generateJWT;
