// middleware/auth.js

module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  };
  