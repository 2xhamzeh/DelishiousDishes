const express = require("express");
const router = express.Router();
const dishesController = require("../controllers/dishesController");

router.get("/", dishesController.readAll); // gets all dishes
router.post("/", dishesController.create); // create a new dish
router.get("/:id", dishesController.read); // gets a specific dish
router.put("/:id", dishesController.update); // updates a specific dish
router.delete("/:id", dishesController.delete); // deletes a specific dish

module.exports = router;
