const express = require("express");
const router = express.Router();
//const homeController = require("../controllers/userController");

router.get("/", (req, res) => {
  res.render("index", { name: "You" });
});

router.get("/contact", (req, res) => {
  res.render("contact", {
    email: "info@us.com",
    phone: "0123456789",
  });
});

module.exports = router;
