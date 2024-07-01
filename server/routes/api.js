const express = require("express");
const router = express.Router();

const usersRouter = require("./usersRoutes");
router.use("/users", usersRouter);

const dishesRouter = require("./dishesRoutes");
router.use("/dishes", dishesRouter);

const uploadRouter = require("./uploadRoutes");
router.use("/upload", uploadRouter);

module.exports = router;
