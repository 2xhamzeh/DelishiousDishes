const express = require("express");
const router = express.Router();
const dishesController = require("../controllers/dishesController");

router.get("/", dishesController.readAll);
router.post("/", dishesController.create);

module.exports = router;
