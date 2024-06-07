const express = require("express");
const app = express();
app.use(express.json()); // this is a body parser, allows us to read body data

// routes
const apiRouter = require("./routes/api"); // api routes
app.use("/api", apiRouter);
const homeRouter = require("./routes/homeRoutes"); // home routes (index.html, for now this redirects to frontend server)
app.use(homeRouter);

// connect to database through mongoose
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/dish_db")
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => console.log(`Connection to DB failed! ${error}`));

// using public as main directory for static content (styles, images, ...)
app.use(express.static("public"));

// error handling
const errorController = require("./controllers/errorController");
app.use(errorController.handleErrors);

app.listen(3000);
