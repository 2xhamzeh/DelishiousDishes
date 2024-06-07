const express = require("express");
const app = express();
app.use(express.json()); // this is a body parser, allows us to read body data

// routes
const apiRouter = require("./routes/api"); // api routes
app.use("/api", apiRouter);
const homeRouter = require("./routes/homeRoutes"); // home routes (index.html)
app.use(homeRouter);

// connect to database through mongoose and save connection in db if needed
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/dish_db");
const db = mongoose.connection;
// in case connection fails
db.on("error", () => console.log("Connection to DB failed!"));
// once connected to database, run once.
db.once("open", () => {
  console.log("Connected to MongoDB!");
});
// tell mongoose we want to use native ES6 promises
mongoose.Promise = global.Promise;

// using public as main directory for static content (styles, images, ...)
app.use(express.static("public"));

// error handling
const errorController = require("./controllers/errorController");
app.use(errorController.handleErrors);

app.listen(3000);
