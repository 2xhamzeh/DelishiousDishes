const User = require("../models/user");
const passport = require("passport");
const jwtAuth = require("../middleware/jwtAuth");

module.exports = {
  authenticate: async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        console.log("Error during authentication:", err);
        return next(err);
      }
      if (!user) {
        console.log("Authentication failed. User not found.");
        return res
          .status(401)
          .send({ message: "Username or password incorrect" });
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
      .select("username img")
      .exec()
      .then((users) => {
        res.send(users);
      })
      .catch(next);
  },

  create: async (req, res, next) => {
    const { username, password, description, img } = req.body;

    try {
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ message: "Username already taken" });
      }

      // Register the new user
      User.register(
        new User({ username, description, img }),
        password,
        (err, user) => {
          if (err) {
            return next(err);
          }
          res
            .status(201)
            .send({ user: { id: user.id, username: user.username } });
        }
      );
    } catch (err) {
      next(err);
    }
  },

  read: (req, res, next) => {
    const userId = req.params.id;
    User.findById(userId)
      .populate({
        path: "dishes",
        select: "name img likes", // Only include _id, name, and img (picture)
      })
      .populate({
        path: "liked",
        select: "name img", // Only include _id, name, and img (picture)
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send();
        }
        res.send(user);
      })
      .catch(next);
  },

  update: async (req, res, next) => {
    const userId = req.params.id;

    // Check if the authenticated user is the same as the user being updated
    if (req.userId !== userId) {
      return res.status(403).send({ message: "Forbidden" });
    }

    try {
      // Update the user document
      await User.findByIdAndUpdate(
        userId,
        { $set: req.body },
        { runValidators: true }
      );

      // Fetch the updated user with the required fields populated
      const updatedUser = await User.findById(userId)
        .populate({
          path: "dishes",
          select: "name img likes", // Only include _id, name, and img (picture)
        })
        .populate({
          path: "liked",
          select: "name img", // Only include _id, name, and img (picture)
        });

      if (!updatedUser) {
        return res.status(404).send();
      }

      res.send(updatedUser);
    } catch (err) {
      next(err);
    }
  },

  delete: (req, res, next) => {
    const userId = req.params.id;
    if (req.userId !== userId) {
      return res.status(403).send({ message: "Forbidden" });
    }
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
