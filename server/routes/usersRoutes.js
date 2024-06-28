const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const { verifyToken } = require("../middleware/jwtAuth");

router.post("/authenticate", usersController.authenticate);
router.post("/logout", verifyToken, usersController.logout);
router.get("/", usersController.readAll);
router.post("/", usersController.create);
router.get("/:id", usersController.read);
router.put("/:id", verifyToken, usersController.update);
router.delete("/:id", verifyToken, usersController.delete);

module.exports = router;
