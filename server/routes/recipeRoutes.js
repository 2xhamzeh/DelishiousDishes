const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipesController");

router.get("/", recipeController.readAll);
router.post("/", recipeController.create);

module.exports = router;
