// import user model
const User = require("../models/user");

module.exports = {
  // returns all users in the database
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
  // returns a single user that matches the provided ID
  read: (req, res, next) => {
    var userId = req.params.id;
    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send();
        }
        res.send(user);
      })
      .catch(next);
  },
  update: (req, res, next) => {
    var userId = req.params.id;
    User.findByIdAndUpdate(userId, req.body, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).send();
        }
        res.send(user);
      })
      .catch(next);
  },
  delete: (req, res, next) => {
    var userId = req.params.id;
    User.findByIdAndDelete(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send();
        }
        res.send(user);
      })
      .catch(next);
  },
};
