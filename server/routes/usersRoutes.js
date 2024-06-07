const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// routes here will have /users before them

router.get("/", usersController.readAll); // gets all users
router.post("/", usersController.create); // creates a new user
router.get("/:id", usersController.read); // gets a specific user
router.put("/:id", usersController.update); // updates a specific user
router.delete("/:id", usersController.delete); // deletes a specific user

module.exports = router;
