// This file creates fake data for development purposes. To run, just do `node seed.js`

// Connect to database with mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/recipe_db");
const db = mongoose.connection;
db.on("error", () => console.log("Connection to DB failed!"));
db.once("open", () => console.log("Connected to DB"));

// Import models
const Recipe = require("./models/recipe");
const User = require("./models/user");

// The recipes we want to add
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

// The users to add
const users = [
  {
    username: "admin",
    password: "admin123", // Updated to meet the minimum length requirement
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
const seedDatabase = async () => {
  try {
    // Delete all current recipe data
    await Recipe.deleteMany();
    console.log("Recipe data deleted!");

    // Delete all current user data
    await User.deleteMany();
    console.log("User data deleted!");

    // Creating new users and associating recipes with them
    const createdUsers = await User.create(users);
    console.log("Users created!");

    // Creating new recipes and associating them with users
    for (let i = 0; i < recipes.length; i++) {
      // Assign each recipe to a user
      const user = createdUsers[i % createdUsers.length];
      const recipe = new Recipe({
        name: recipes[i].name,
        ingredients: recipes[i].ingredients,
        instructions: recipes[i].instructions,
        author: user._id,
      });
      await recipe.save();
      user.recipes.push(recipe._id);
      await user.save();
    }
    console.log("Recipes created and associated with users!");

    // Close the connection
    mongoose.connection.close();
    console.log("Database connection closed.");
  } catch (error) {
    console.error(error);
    mongoose.connection.close();
  }
};

// Run the seed function
seedDatabase();
