"use strict"
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/recipe_db", {
  useNewUrlParser: true,
});
const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

const recipeSchema = mongoose.Schema({
  meal: String,
  formOfNutrition: String,
  time: String,
  zipCode: Number,
});

module.exports = mongoose.model("Recipe", recipeSchema);

const Recipe = mongoose.model("Recipe", recipeSchema);

var recipe1 = new Recipe({
    meal: "Vegane Protein-Bowl",
    formOfNutrition: "Vegan",
    time: "40 min",
  });
  recipe1.save()
    .then(savedDocument => {
      console.log(savedDocument);
    })
    .catch(error => {
      console.log(error);
    });

    Recipe.create({
        meal: "Spaghetti Amatriciana",
    formOfNutrition: "Laktosefrei",
    time: "30 min",
  })
  .then(savedDocument => {
    console.log(savedDocument);
  })
  .catch(error => {
    console.log(error);
  });