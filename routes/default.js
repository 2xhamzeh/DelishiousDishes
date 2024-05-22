const express = require("express");
const router = express.Router();
//const homeController = require("../controllers/userController");

router.get("/", (req, res) => {
  res.render("index", { name: "You" });
});

module.exports = router;
