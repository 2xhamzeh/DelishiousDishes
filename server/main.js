const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const errorController = require("./controllers/errorController");

const User = require("./models/user");
const apiRouter = require("./routes/api");
const homeRouter = require("./routes/homeRoutes");

// Middleware
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
// The lines above are old dated, they can be replaced by the following line without requiring an extra module
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.use("/api", apiRouter);
app.use(homeRouter);

// Connect to database
mongoose
  .connect("mongodb://localhost:27017/dish_db")
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => console.log(`Connection to DB failed! ${error}`));

// Using public as main directory for static content
app.use(express.static("public"));

// Error handling
app.use(errorController.handleErrors);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
