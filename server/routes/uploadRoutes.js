// uploadRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const jwtAuth = require("../middleware/jwtAuth");
const usersController = require("../controllers/usersController");
const dishesController = require("../controllers/dishesController");

// Set up storage destination and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Appends the file extension
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

// Initialize upload with storage and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

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
