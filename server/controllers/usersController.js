// import user model
const User = require("../models/user");

module.exports = {
  readAll: (req, res, next) => {
    // TODO: change so passwords aren't sent back
    User.find({})
      .select("-password")
      .exec()
      .then((users) => {
        res.send(users);
      })
      .catch(next);
  },
  create: (req, res, next) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    user
      .save()
      .then(() => {
        res.sendStatus(200);
      })
      .catch(next);
  },
  read: (req, res, next) => {
    // code to read/get user
  },
  update: (req, res, next) => {
    // code to update/edit user info
  },
  delete: (req, res, next) => {
    // code to delete user
  },
};
