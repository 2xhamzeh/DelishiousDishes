const express = require("express");
const router = express.Router();

const usersRouter = require("./usersRoutes");
router.use("/users", usersRouter);

const dishesRouter = require("./dishesRoutes");
router.use("/dishes", dishesRouter);

module.exports = router;
