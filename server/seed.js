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
    picture: "/images/dish.jpg",
    likes: 10,
    time: 30,
    difficulty: "Easy",
    ingredients: ["Fettuccine", "Cream", "Parmesan"],
    instructions: ["Boil pasta", "Make sauce", "Combine and serve"],
  },
  {
    name: "Falafel",
    picture: "/images/dish.jpg",
    likes: 20,
    time: 45,
    difficulty: "Medium",
    ingredients: ["Chickpeas", "Garlic", "Parsley"],
    instructions: ["Soak chickpeas", "Blend ingredients", "Fry patties"],
  },
  {
    name: "Shawarma",
    picture: "/images/dish.jpg",
    likes: 15,
    time: 60,
    difficulty: "Hard",
    ingredients: ["Chicken", "Spices", "Flatbread"],
    instructions: ["Marinate chicken", "Grill chicken", "Assemble wraps"],
  },
  {
    name: "Cheese Cake",
    picture: "/images/dish.jpg",
    likes: 25,
    time: 90,
    difficulty: "Medium",
    ingredients: ["Cream cheese", "Sugar", "Graham crackers"],
    instructions: ["Prepare crust", "Make filling", "Bake and chill"],
  },
  {
    name: "Margherita Pizza",
    picture: "/images/dish.jpg",
    likes: 30,
    time: 40,
    difficulty: "Easy",
    ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella", "Basil"],
    instructions: ["Prepare dough", "Spread sauce", "Add toppings", "Bake"],
  },
  {
    name: "Pad Thai",
    picture: "/images/dish.jpg",
    likes: 40,
    time: 50,
    difficulty: "Medium",
    ingredients: ["Rice noodles", "Shrimp", "Tofu", "Peanuts", "Bean sprouts"],
    instructions: ["Soak noodles", "Cook shrimp and tofu", "Mix ingredients"],
  },
  {
    name: "Tacos",
    picture: "/images/dish.jpg",
    likes: 35,
    time: 30,
    difficulty: "Easy",
    ingredients: ["Tortillas", "Ground beef", "Lettuce", "Cheese", "Salsa"],
    instructions: ["Cook beef", "Prepare toppings", "Assemble tacos"],
  },
  {
    name: "Sushi",
    picture: "/images/dish.jpg",
    likes: 50,
    time: 60,
    difficulty: "Hard",
    ingredients: ["Sushi rice", "Nori", "Fish", "Vegetables"],
    instructions: [
      "Prepare rice",
      "Slice fish",
      "Roll sushi",
      "Cut into pieces",
    ],
  },
  {
    name: "Chocolate Cake",
    picture: "/images/dish.jpg",
    likes: 45,
    time: 90,
    difficulty: "Medium",
    ingredients: ["Flour", "Cocoa powder", "Sugar", "Eggs", "Butter"],
    instructions: [
      "Prepare batter",
      "Bake cake",
      "Prepare frosting",
      "Frost cake",
    ],
  },
  {
    name: "Chicken Curry",
    picture: "/images/dish.jpg",
    likes: 55,
    time: 70,
    difficulty: "Medium",
    ingredients: ["Chicken", "Curry paste", "Coconut milk", "Vegetables"],
    instructions: [
      "Cook chicken",
      "Add curry paste",
      "Add coconut milk and vegetables",
      "Simmer",
    ],
  },
];

// The users to add
const users = [
  {
    username: "admin",
    password: "admin123",
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
        picture: dishes[i].picture,
        likes: dishes[i].likes,
        time: dishes[i].time,
        difficulty: dishes[i].difficulty,
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
