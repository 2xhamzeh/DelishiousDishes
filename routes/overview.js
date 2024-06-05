const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Post = require("../models/Post");
const Recipe = require("../models/recipe");

// Route to fetch and display all posts with their authors
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().populate('author');
    res.render("postsOverview", { posts });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to fetch and display all recipes
router.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.render("recipesOverview", { recipes });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
