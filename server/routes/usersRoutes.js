const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

// routes here will have /users before them

router.get("/", userController.readAll);
router.post("/", userController.create);

module.exports = router;
