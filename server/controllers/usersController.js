// import user model
const User = require("../models/user");

module.exports = {
  authenticate: (req, res, next) => {
    User.findOne({ username: req.body.username })
      .then((user) => {
        if (user) {
          user.passwordComparison(req.body.password).then((passwordMatch) => {
            if (passwordMatch) {
              // if user is found and password is correct
              res.send({ message: "User authenticated!", user: user });
            } else {
              // if password is incorrect
              const err = new Error("Password incorrect!");
              err.status = 401;
              next(err);
            }
          });
        } else {
          // if user doesn't exist
          const err = new Error("User not found!");
          err.status = 404;
          next(err);
        }
      })
      .catch(next);
  },

  readAll: (req, res, next) => {
    // TODO: change so passwords aren't sent back
    User.find({})
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
