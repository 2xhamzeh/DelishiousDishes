const User = require("../models/user");
const passport = require("passport");
const jwtAuth = require("../middleware/jwtAuth");

module.exports = {
  authenticate: (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        console.log("Error during authentication:", err);
        return next(err);
      }
      if (!user) {
        console.log("Authentication failed. User not found.");
        return res.status(401).send({ message: "Unauthorized" });
      }
      req.logIn(user, (err) => {
        if (err) {
          console.log("Error during login:", err);
          return next(err);
        }
        const token = jwtAuth.generateToken(user);
        res.send({
          message: "User authenticated!",
          user: { id: user.id, username: user.username },
          token: token,
        });
      });
    })(req, res, next);
  },

  logout: (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.send("User logged out");
    });
  },

  readAll: (req, res, next) => {
    User.find({})
      .exec()
      .then((users) => {
        res.send(users);
      })
      .catch(next);
  },

  create: (req, res, next) => {
    User.register(
      new User({ username: req.body.username }),
      req.body.password,
      (err, user) => {
        if (err) {
          return next(err);
        }
        res.status(200).send({ user: { id: user.id, username: user.username } });
      }
    );
  },

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
