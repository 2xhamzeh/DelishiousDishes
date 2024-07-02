const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const jwtAuth = require("../middleware/jwtAuth");
const usersController = require("../controllers/usersController");
const dishesController = require("../controllers/dishesController");

// Route for user image upload
router.post(
  "/userImage/:userId",
  jwtAuth.verifyToken,
  upload.single("image"),
  usersController.uploadUserImage
);

// Route for dish image upload
router.post(
  "/dishImage/:dishId",
  jwtAuth.verifyToken,
  upload.single("image"),
  dishesController.uploadDishImage
);

module.exports = router;
