const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");

router.get("/", recipeController.getAllRecipes);
router.post("/", recipeController.addRecipe);

module.exports = router;
