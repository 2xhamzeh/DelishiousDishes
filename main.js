const express = require("express");
const app = express();
const userController = require("./controllers/userController");
const errorController = require("./controllers/errorController");
const Recipe = require("./models/recipe")

const MongoDB = require("mongodb").MongoClient,
  dbURL = "mongodb://localhost:27017",
  dbName = "recipe_db";

MongoDB.connect(dbURL, (error, client) => {
  if (error) throw error;
  let db = client.db(dbName);
  db.collection("contacts")
    .find()
    .toArray((error, data) => {
      if (error) throw error;
      console.log(data);
    });
});

app.use(express.static('public'));
const layouts = require("express-ejs-layouts");

app.get("/", (req,res)=>{
    res.render("index", { name: "Your Name" });
});

app.get("/users/:id", userController.sendUserProfile);

app.post("/sign_up", userController.userSignUpProcessor);
app.get("/name/:myName", userController.respondWithName);
app.get("/contact", userController.respondWithContactInfo);

app.use(layouts);
app.set("view engine", "ejs");


app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

var myQuery = Recipe.findOne({
    meal: "Vegane Protein-Bowl",
  }).where("time", /min/);

  myQuery.exec()
  .then(data => {
    if (data) console.log(data.name);
  })
  .catch(error => {
    console.log(error);
  });

app.listen(3000);
