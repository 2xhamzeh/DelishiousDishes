const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// routes here will have /users before them

router.get("/", usersController.readAll);
router.post("/", usersController.create);

module.exports = router;
