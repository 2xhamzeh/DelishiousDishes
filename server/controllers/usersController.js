// import user model
const User = require("../models/user");
const passport = require("passport");

module.exports = {
  authenticate: (req, res, next) => {
    passport.authenticate("local", (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        const error = new Error("Username or password incorrect");
        error.status = 401;
        return next(error);
      }
      // this creates a session and triggers serialization. It also attached the user to req.user
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        // If authentication succeeds, return user object without password
        res.send({
          message: "User authenticated!",
          user: { id: user.id, username: user.username },
        });
      });
    })(req, res, next);
  },

  logout: (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
    });
    res.send("User logged out");
  },

  readAll: (req, res, next) => {
    console.log(req.isAuthenticated());
    // Adjust to not send passwords back
    // returns all users in the database
    readAll: (req, res, next) => {
      console.log("GET /api/users/ - readAll"); // Log request
      // TODO: change so passwords aren't sent back
      User.find({})
        .exec()
        .then((users) => {
          res.send(users);
        })
        .catch(next);
    };
  },

  create: (req, res, next) => {
    // Creating a new user with passport-local-mongoose
    User.register(
      new User({ username: req.body.username }),
      req.body.password,
      (err, user) => {
        if (err) {
          return next(err);
        }
        res
          .status(200)
          .send({ user: { id: user.id, username: user.username } });
      }
    );
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
