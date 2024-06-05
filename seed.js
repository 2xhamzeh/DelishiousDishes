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
const Post = require("./models/Post");

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
    password: "admin123",  // Updated to meet the minimum length requirement
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

// The posts we added
const posts = [
  {
    title: "First Post",
    content: "This is the content of the first post.",
  },
  {
    title: "Second Post",
    content: "This is the content of the second post.",
  },
  {
    title: "Third Post",
    content: "This is the content of the third post.",
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

    // Delete all current post data
    await Post.deleteMany();
    console.log("Post data deleted!");

    // Create new recipes
    await Recipe.create(recipes);
    console.log("Recipes created!");

    // Creating new users and associating posts with them
    const createdUsers = await User.create(users);
    console.log("Users created!");

    // Creating new posts and associating them with users
    for (let i = 0; i < posts.length; i++) {
      // Assign each post to a user 
      const user = createdUsers[i % createdUsers.length];
      const post = new Post({
        title: posts[i].title,
        content: posts[i].content,
        author: user._id
      });
      await post.save();
      user.posts.push(post._id);
      await user.save();
    }
    console.log("Posts created and associated with users!");

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
