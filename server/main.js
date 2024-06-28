const express = require("express");
const app = express();
const expressSession = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const errorController = require('./controllers/errorController');

const User = require("./models/user");
const apiRouter = require("./routes/api");
const homeRouter = require("./routes/homeRoutes");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport configuration
app.use(
  expressSession({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, // 1 hour
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

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
