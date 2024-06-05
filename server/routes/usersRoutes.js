const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

// routes here will have /users before them

router.get("/", userController.getAllUsers);
router.post("/", userController.signup);

module.exports = router;
