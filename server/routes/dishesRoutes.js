const express = require("express");
const router = express.Router();
const dishesController = require("../controllers/dishesController");
const { verifyToken } = require("../middleware/jwtAuth");

router.get("/", dishesController.readAll);
router.post("/", dishesController.create);
router.get("/:id", dishesController.read);
router.put("/:id", dishesController.update);
router.delete("/:id", dishesController.delete);

module.exports = router;
