// this file creates fake data for development purposes, to run just do node seed.js

// connect to database with mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/recipe_db");
const db = mongoose.connection;
db.on("error", () => console.log("Connection to DB failed!"));
db.once("open", () => console.log("connected to DB"));

// import models
const Recipe = require("./models/recipe");
const User = require("./models/user");

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

// Function to seed the database
// not using promises like in the book, because the data is being inserted before deletion is finished
// to do the following with promises, we'd need lots of chaining
// its good to also learn this async() await syntax, its a different way to use promises
const seedDatabase = async () => {
  try {
    // delete all current recipe data
    await Recipe.deleteMany();
    console.log("Recipe data deleted!");

    // delete all current user data
    await User.deleteMany();
    console.log("User data deleted!");

    // create new recipes
    await Recipe.create(recipes);
    console.log("Recipes created!");

    // create new users
    await User.create(users);
    console.log("Users created!");

    // close the connection
    mongoose.connection.close();
    console.log("Database connection closed.");
  } catch (error) {
    console.error(error);
  }
};

// Run the seed function
seedDatabase();
