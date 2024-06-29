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
      const { token, expiresIn } = jwtAuth.generateToken(user);
      const expiryDate = new Date(Date.now() + expiresIn * 1000).toISOString();
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
      });
      res.send({
        message: "User authenticated!",
        user: { id: user.id, username: user.username },
        tokenExpiry: expiryDate,
      });
    })(req, res, next);
  },

  logout: (req, res, next) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.send("User logged out");
  },

  readAll: (req, res, next) => {
    User.find({})
      .populate("dishes liked")
      .exec()
      .then((users) => {
        res.send(users);
      })
      .catch(next);
  },

  create: (req, res, next) => {
    const { username, password, description, img } = req.body;
    User.register(
      new User({ username, description, img }),
      password,
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

  read: (req, res, next) => {
    const userId = req.params.id;
    User.findById(userId)
      .populate("dishes liked")
      .then((user) => {
        if (!user) {
          return res.status(404).send();
        }
        res.send(user);
      })
      .catch(next);
  },

  update: (req, res, next) => {
    const userId = req.params.id;
    User.findByIdAndUpdate(userId, req.body, { new: true })
      .populate("dishes liked")
      .then((user) => {
        if (!user) {
          return res.status(404).send();
        }
        res.send(user);
      })
      .catch(next);
  },

  delete: (req, res, next) => {
    const userId = req.params.id;
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
