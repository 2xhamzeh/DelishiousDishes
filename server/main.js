require("dotenv").config();

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const errorController = require("./controllers/errorController");
const path = require("path");

const User = require("./models/user");
const apiRouter = require("./routes/api");
const homeRouter = require("./routes/homeRoutes");

// Middleware
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
// The lines above are old dated, they can be replaced by the following line without requiring an extra module
app.use(express.json());
app.use(cookieParser());

// Update the Express Backend to Serve Static Files from the React Frontend
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

// Using public as main directory for static content
app.use(express.static("public"));
app.use(express.static(path.join(__dirname + "/dist")));

app.use(passport.initialize());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.use("/api", apiRouter);
app.use(homeRouter);

// Connect to database
mongoose
  .connect(process.env.DB_URI || "mongodb://localhost:27017/", {
    dbName: "delishious_dishes_db",
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => console.log(`Connection to DB failed! ${error}`));

// Error handling
app.use(errorController.handleErrors);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
