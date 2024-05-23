const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.homePage);

router.get("/contact", homeController.contactPage);

module.exports = router;
