// this file creates fake data for development purposes, to run just do node seed.js

// connect to database with mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/recipe_db");
const db = mongoose.connection;

// import models
const Recipe = require("./models/recipe");

// the recipes we want to add
const recipes = [
  {
    name: "Fettuccine Alfredo",
    ingredients: "stuff",
    instructions: "1 then 2 then 3",
  },
  {
    name: "Falafel",
    ingredients: "Hummus and stuff",
    instructions: "1 then 2 then 3",
  },
  {
    name: "Shawarma",
    ingredients: "Chicken and stuff",
    instructions: "1 then 2 then 3",
  },
  {
    name: "Cheese Cake",
    ingredients: "Cheese?",
    instructions: "5 then 2 then 3",
  },
];

// the users to add
const users = [
  {
    username: "admin",
    password: "admin",
  },
  {
    username: "user123",
    password: "123123123",
  },
  {
    username: "TheRandomUser",
    password: "mehaha",
  },
];

// delete all current recipe data
Recipe.deleteMany()
  .exec()
  .then(() => console.log("Recipe data is empty!"));

// delete all current user data
// TODO

//the array that stores all the commands (model creations) we want to execute
let commands = [];

// for every recipe we add a create command
recipes.forEach((r) => {
  commands.push(
    Recipe.create({
      name: r.name,
      ingredients: r.ingredients,
      instructions: r.instructions,
    })
  );
});

// for every user we add a create command
// TODO

// run all commands and close connection
Promise.all(commands)
  .then(() => {
    console.log("Data created!");
    mongoose.connection.close();
  })
  .catch((error) => console.log(error));
