const path = require("path");

module.exports = {
  homePage: (req, res, next) => {
    try {
      res.sendFile(path.join(__dirname, "../dist/index.html"));
    } catch (err) {
      next(err);
    }
  },
};
