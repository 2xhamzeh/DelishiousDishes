const express = require("express");
const router = express.Router();
const dishesController = require("../controllers/dishesController");
const { verifyToken } = require("../middleware/jwtAuth");

router.get("/", verifyToken, dishesController.readAll);
router.post("/", verifyToken, dishesController.create);
router.get("/:id", verifyToken, dishesController.read);
router.put("/:id", verifyToken, dishesController.update);
router.delete("/:id", verifyToken, dishesController.delete);

module.exports = router;
