const express = require("express");
const app = express();

const expressSession = require("express-session");
//const cookieParser = require("cookie-parser"); // we don't need this for now, cause express-session handles its own cookies
const passport = require("passport");

app.use(express.json()); // this is a body parser, allows us to read body data

// setting up passport
app.use(
  expressSession({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      // this determines how long the user will be authenticated for/how long the session lasts
      maxAge: 3600000, //1 hour
      //maxAge: 60000, // 1 minute
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
const User = require("./models/user");
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
