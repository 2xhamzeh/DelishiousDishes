const express = require("express");
const router = express.Router();

const userRouter = require("./usersRoutes");
router.use("/users", userRouter);

const recipeRouter = require("./recipeRoutes");
router.use("/recipes", recipeRouter);

module.exports = router;
