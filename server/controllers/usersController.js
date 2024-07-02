const User = require("../models/user");
const Dish = require("../models/dish"); // Ensure you require Dish if you use it
const passport = require("passport");
const jwtAuth = require("../middleware/jwtAuth");
const fs = require("fs");
const path = require("path");
const cloudinary = require("../config/cloudinary");

const deleteLocalFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting local file:", err);
    }
  });
};

module.exports = {
  isAuthenticated: async (req, res, next) => {
    const userId = req.userId;
    if (userId) {
      res.status(200).json({ message: "User is authenticated" });
    } else {
      res.status(401).json({ message: "User is not authenticated" });
    }
  },
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
          .json({ message: "Username or password incorrect" });
      }
      const { token, expiresIn } = jwtAuth.generateToken(user);
      const expiryDate = new Date(Date.now() + expiresIn * 1000).toISOString();
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "Strict",
      });
      res.json({
        message: "User authenticated!",
        user: { id: user.id, username: user.username },
        tokenExpiry: expiryDate,
      });
    })(req, res, next);
  },

  logout: (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.json({ message: "User logged out successfully" });
  },

  readAll: async (req, res, next) => {
    try {
      const users = await User.find({}).select("username img").exec();
      res.json(users);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    const { username, password, description, img } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ message: "Username already taken" });
      }

      const user = new User({ username, description, img });
      User.register(user, password, (err, user) => {
        if (err) {
          console.error("Error registering new user:", err);
          return next(err);
        }
        res
          .status(201)
          .json({ user: { id: user.id, username: user.username } });
      });
    } catch (err) {
      next(err);
    }
  },

  read: async (req, res, next) => {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId)
        .populate("dishes", "name img likes")
        .populate("liked", "name img")
        .exec();
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    const userId = req.params.id;
    if (req.userId !== userId) {
      return res
        .status(403)
        .json({ message: "Forbidden - Not allowed to update this user" });
    }

    try {
      const updateData = { ...req.body };
      if (updateData.username) {
        const existingUser = await User.findOne({
          username: updateData.username,
        });
        if (existingUser && existingUser._id.toString() !== userId) {
          return res.status(409).json({ message: "Username already in use" });
        }
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true, runValidators: true }
      )
        .populate("dishes", "name img likes")
        .populate("liked", "name img")
        .exec();
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    const userId = req.params.id;
    if (req.userId !== userId) {
      return res
        .status(403)
        .json({ message: "Forbidden - Not allowed to delete this user" });
    }

    try {
      const user = await User.findByIdAndDelete(userId).exec();
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      await Dish.deleteMany({ author: userId }).exec();
      await Dish.updateMany(
        { likedBy: userId },
        { $pull: { likedBy: userId } }
      ).exec();
      await User.updateMany(
        { liked: userId },
        { $pull: { liked: userId } }
      ).exec();
      res.json({ message: "User deleted successfully", user });
    } catch (error) {
      next(error);
    }
  },
  uploadUserImage: async (req, res) => {
    const userId = req.params.userId;

    if (req.userId !== userId) {
      if (req.file) deleteLocalFile(req.file.path);
      return res
        .status(403)
        .json({ message: "Forbidden - Not allowed to update this user" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "users",
      });
      const user = await User.findByIdAndUpdate(
        userId,
        { img: result.secure_url },
        { new: true }
      );

      deleteLocalFile(req.file.path);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "File uploaded and user image updated successfully.",
        user,
      });
    } catch (error) {
      deleteLocalFile(req.file.path);
      res.status(500).json({ message: "Error updating user image", error });
    }
  },
};
