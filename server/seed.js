// This file creates fake data for development purposes. To run, just do `node seed.js`

// Connect to database with mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/dish_db");
const db = mongoose.connection;
db.on("error", () => console.log("Connection to DB failed!"));
db.once("open", () => console.log("Connected to DB"));

const passport = require("passport");

// Import models
const Dish = require("./models/dish");
const User = require("./models/user");

// The dishes we want to add
const dishes = [
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
  {
    username: "TheRandomUser2",
    password: "mehaha",
  },
  {
    username: "TheRandomUser3",
    password: "mehaha",
  },
  {
    username: "TheRandomUser4",
    password: "mehaha",
  },
  {
    username: "TheRandomUser5",
    password: "mehaha",
  },
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Delete all current dish data
    await Dish.deleteMany();
    console.log("Dish data deleted!");

    // Delete all current user data
    await User.deleteMany();
    console.log("User data deleted!");

    // Creating new users
    const createdUsers = [];
    for (const user of users) {
      const registeredUser = await User.register(
        new User({ username: user.username }),
        user.password
      );
      createdUsers.push(registeredUser);
    }
    console.log("Users created!");

    // Creating new dishes and associating them with users
    for (let i = 0; i < dishes.length; i++) {
      // Assign each dish to a user
      const user = createdUsers[i % createdUsers.length];
      const dish = new Dish({
        name: dishes[i].name,
        ingredients: dishes[i].ingredients,
        instructions: dishes[i].instructions,
        author: user._id,
      });
      await dish.save();
      user.dishes.push(dish._id);
      await user.save();
    }
    console.log("Dishes created and associated with users!");

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
