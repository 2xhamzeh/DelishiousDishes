const express = require("express");
const app = express();
// this is a body parser, allows us to read body data
app.use(express.json());

// setting up the ejs layout
const layouts = require("express-ejs-layouts");
app.use(layouts);
app.set("view engine", "ejs");

// Controllers
const errorController = require("./controllers/errorController");

// routers, importing routers from routes folder
const userRouter = require("./routes/usersRoutes");
app.use("/users", userRouter); // this adds the /users part before all routes in userRouter

const recipeRouter = require("./routes/recipeRoutes");
app.use("/recipes", recipeRouter);

const defaultRouter = require("./routes/homeRoutes");
app.use(defaultRouter);

// connect to database through mongoose and save connection in db if needed
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/recipe_db");
const db = mongoose.connection;
// tell mongoose we want to use native ES6 promises
mongoose.Promise = global.Promise;

// once connected to database, run once.
db.once("open", () => {
  console.log("Connected to MongoDB!");
});

// using public as main directory for static content (styles, images, ...)
app.use(express.static("public"));

// old code for reference
// app.get("/", (req, res) => {
//   res.render("index", { name: "Your Name" });
// });
// app.get("/recipes", recipeController.getAllRecipes);
// app.post("/recipes", recipeController.addRecipe);
// app.get("/users/:id", userController.sendUserProfile);
// app.post("/sign_up", userController.userSignUpProcessor);
// app.get("/name/:myName", userController.respondWithName);
// app.get("/contact", userController.respondWithContactInfo);

// error handling
// logs errors to console
app.use(errorController.logErrors);
// responds for error codes 500(internal), 404(page not found)
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(3000);
