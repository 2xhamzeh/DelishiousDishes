// middleware/jwtAuth.js

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const secret = "your_jwt_secret_key";

module.exports.generateToken = (user) => {
  const expiresIn = 60000; // in seconds
  const token = jwt.sign({ id: user._id, username: user.username }, secret, {
    expiresIn,
  });
  return { token, expiresIn };
};

module.exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).send({ message: "No token provided" });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    req.userId = decoded.id;
    next();
  });
};
