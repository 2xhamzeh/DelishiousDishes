const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipesController");

router.get("/", recipeController.getAllRecipes);
router.post("/", recipeController.addRecipe);

module.exports = router;
