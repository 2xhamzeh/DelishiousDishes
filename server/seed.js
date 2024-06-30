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
    img: "/images/dish.jpg",
    likes: 10,
    time: 30,
    difficulty: "Easy",
    ingredients: ["Fettuccine", "Cream", "Parmesan"],
    instructions: ["Boil pasta", "Make sauce", "Combine and serve"],
  },
  {
    name: "Falafel",
    img: "/images/dish.jpg",
    likes: 20,
    time: 45,
    difficulty: "Medium",
    ingredients: ["Chickpeas", "Garlic", "Parsley"],
    instructions: ["Soak chickpeas", "Blend ingredients", "Fry patties"],
  },
  {
    name: "Shawarma",
    img: "/images/dish.jpg",
    likes: 15,
    time: 60,
    difficulty: "Hard",
    ingredients: ["Chicken", "Spices", "Flatbread"],
    instructions: ["Marinate chicken", "Grill chicken", "Assemble wraps"],
  },
  {
    name: "Cheese Cake",
    img: "/images/dish.jpg",
    likes: 25,
    time: 90,
    difficulty: "Medium",
    ingredients: ["Cream cheese", "Sugar", "Graham crackers"],
    instructions: ["Prepare crust", "Make filling", "Bake and chill"],
  },
  {
    name: "Margherita Pizza",
    img: "/images/dish.jpg",
    likes: 30,
    time: 40,
    difficulty: "Easy",
    ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella", "Basil"],
    instructions: ["Prepare dough", "Spread sauce", "Add toppings", "Bake"],
  },
  {
    name: "Pad Thai",
    img: "/images/dish.jpg",
    likes: 40,
    time: 50,
    difficulty: "Medium",
    ingredients: ["Rice noodles", "Shrimp", "Tofu", "Peanuts", "Bean sprouts"],
    instructions: ["Soak noodles", "Cook shrimp and tofu", "Mix ingredients"],
  },
  {
    name: "Tacos",
    img: "/images/dish.jpg",
    likes: 35,
    time: 30,
    difficulty: "Easy",
    ingredients: ["Tortillas", "Ground beef", "Lettuce", "Cheese", "Salsa"],
    instructions: ["Cook beef", "Prepare toppings", "Assemble tacos"],
  },
  {
    name: "Sushi",
    img: "/images/dish.jpg",
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
    img: "/images/dish.jpg",
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
    img: "/images/dish.jpg",
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
  {
    name: "Lasagna",
    img: "/images/dish.jpg",
    likes: 60,
    time: 120,
    difficulty: "Hard",
    ingredients: ["Lasagna noodles", "Ground beef", "Tomato sauce", "Cheese"],
    instructions: [
      "Cook noodles",
      "Prepare sauce",
      "Layer ingredients",
      "Bake",
    ],
  },
  {
    name: "Biryani",
    img: "/images/dish.jpg",
    likes: 70,
    time: 90,
    difficulty: "Hard",
    ingredients: ["Basmati rice", "Chicken", "Yogurt", "Spices"],
    instructions: ["Marinate chicken", "Cook rice", "Layer and cook"],
  },
  {
    name: "Caesar Salad",
    img: "/images/dish.jpg",
    likes: 25,
    time: 20,
    difficulty: "Easy",
    ingredients: ["Romaine lettuce", "Caesar dressing", "Croutons", "Parmesan"],
    instructions: ["Chop lettuce", "Add dressing", "Add croutons and cheese"],
  },
  {
    name: "Pancakes",
    img: "/images/dish.jpg",
    likes: 35,
    time: 20,
    difficulty: "Easy",
    ingredients: ["Flour", "Milk", "Eggs", "Baking powder", "Sugar"],
    instructions: ["Mix ingredients", "Cook on griddle", "Serve with syrup"],
  },
  {
    name: "Grilled Cheese",
    img: "/images/dish.jpg",
    likes: 30,
    time: 10,
    difficulty: "Easy",
    ingredients: ["Bread", "Butter", "Cheese"],
    instructions: ["Butter bread", "Place cheese", "Grill until golden"],
  },
  {
    name: "Beef Stroganoff",
    img: "/images/dish.jpg",
    likes: 40,
    time: 60,
    difficulty: "Medium",
    ingredients: ["Beef", "Mushrooms", "Onion", "Sour cream"],
    instructions: ["Cook beef", "Add mushrooms and onion", "Add sour cream"],
  },
  {
    name: "Clam Chowder",
    img: "/images/dish.jpg",
    likes: 45,
    time: 45,
    difficulty: "Medium",
    ingredients: ["Clams", "Potatoes", "Onions", "Cream"],
    instructions: ["Cook clams", "Add potatoes and onions", "Add cream"],
  },
  {
    name: "Eggs Benedict",
    img: "/images/dish.jpg",
    likes: 50,
    time: 30,
    difficulty: "Hard",
    ingredients: ["English muffins", "Eggs", "Ham", "Hollandaise sauce"],
    instructions: ["Toast muffins", "Poach eggs", "Add ham and sauce"],
  },
  {
    name: "Ratatouille",
    img: "/images/dish.jpg",
    likes: 40,
    time: 60,
    difficulty: "Medium",
    ingredients: ["Eggplant", "Zucchini", "Tomatoes", "Bell peppers"],
    instructions: ["Slice vegetables", "Layer in dish", "Bake until tender"],
  },
  {
    name: "Chicken Alfredo",
    img: "/images/dish.jpg",
    likes: 35,
    time: 40,
    difficulty: "Easy",
    ingredients: ["Chicken", "Fettuccine", "Cream", "Parmesan"],
    instructions: [
      "Cook chicken",
      "Boil pasta",
      "Make sauce",
      "Combine and serve",
    ],
  },
  {
    name: "Fish Tacos",
    img: "/images/dish.jpg",
    likes: 55,
    time: 30,
    difficulty: "Easy",
    ingredients: ["Fish fillets", "Tortillas", "Cabbage", "Salsa"],
    instructions: ["Cook fish", "Prepare toppings", "Assemble tacos"],
  },
  {
    name: "BBQ Ribs",
    img: "/images/dish.jpg",
    likes: 60,
    time: 180,
    difficulty: "Hard",
    ingredients: ["Pork ribs", "BBQ sauce", "Spices"],
    instructions: ["Season ribs", "Slow cook", "Apply sauce and grill"],
  },
  {
    name: "Greek Salad",
    img: "/images/dish.jpg",
    likes: 25,
    time: 15,
    difficulty: "Easy",
    ingredients: ["Cucumber", "Tomatoes", "Feta cheese", "Olives"],
    instructions: [
      "Chop vegetables",
      "Add cheese and olives",
      "Toss with dressing",
    ],
  },
  {
    name: "Stuffed Peppers",
    img: "/images/dish.jpg",
    likes: 45,
    time: 60,
    difficulty: "Medium",
    ingredients: ["Bell peppers", "Ground beef", "Rice", "Tomato sauce"],
    instructions: ["Prepare filling", "Stuff peppers", "Bake until tender"],
  },
  {
    name: "Lemon Meringue Pie",
    img: "/images/dish.jpg",
    likes: 50,
    time: 90,
    difficulty: "Hard",
    ingredients: ["Lemon", "Sugar", "Eggs", "Pie crust"],
    instructions: [
      "Prepare crust",
      "Make filling",
      "Top with meringue and bake",
    ],
  },
  {
    name: "Chicken Tikka Masala",
    img: "/images/dish.jpg",
    likes: 60,
    time: 60,
    difficulty: "Medium",
    ingredients: ["Chicken", "Yogurt", "Spices", "Tomato sauce"],
    instructions: ["Marinate chicken", "Cook chicken", "Add sauce and simmer"],
  },
  {
    name: "Goulash",
    img: "/images/dish.jpg",
    likes: 35,
    time: 75,
    difficulty: "Medium",
    ingredients: ["Beef", "Onions", "Paprika", "Potatoes"],
    instructions: [
      "Cook beef",
      "Add onions and paprika",
      "Add potatoes and simmer",
    ],
  },
  {
    name: "Quiche Lorraine",
    img: "/images/dish.jpg",
    likes: 40,
    time: 60,
    difficulty: "Medium",
    ingredients: ["Pie crust", "Eggs", "Bacon", "Cream"],
    instructions: [
      "Prepare crust",
      "Cook bacon",
      "Mix filling",
      "Bake until set",
    ],
  },
  {
    name: "Bruschetta",
    img: "/images/dish.jpg",
    likes: 30,
    time: 20,
    difficulty: "Easy",
    ingredients: ["Baguette", "Tomatoes", "Garlic", "Basil"],
    instructions: ["Toast baguette", "Mix topping", "Spoon topping onto bread"],
  },
  {
    name: "Shrimp Scampi",
    img: "/images/dish.jpg",
    likes: 45,
    time: 30,
    difficulty: "Easy",
    ingredients: ["Shrimp", "Garlic", "Butter", "Lemon"],
    instructions: ["Cook shrimp", "Add garlic and butter", "Serve with lemon"],
  },
];

// The users to add
const users = [
  {
    username: "admin",
    password: "admin123",
    description: "Administrator",
    img: "/images/placeholder.png",
  },
  {
    username: "user123",
    password: "123123123",
    description: "Just a regular user",
    img: "/images/placeholder.png",
  },
  {
    username: "user1",
    password: "password1",
    description: "Food lover",
    img: "/images/placeholder.png",
  },
  {
    username: "user2",
    password: "password2",
    description: "Chef",
    img: "/images/placeholder.png",
  },
  {
    username: "user3",
    password: "password3",
    description: "Baker",
    img: "/images/placeholder.png",
  },
  {
    username: "user4",
    password: "password4",
    description: "Grill master",
    img: "/images/placeholder.png",
  },
  {
    username: "user5",
    password: "password5",
    description: "Vegetarian",
    img: "/images/placeholder.png",
  },
  {
    username: "user6",
    password: "password6",
    description: "Vegan",
    img: "/images/placeholder.png",
  },
  {
    username: "user7",
    password: "password7",
    description: "Home cook",
    img: "/images/placeholder.png",
  },
  {
    username: "user8",
    password: "password8",
    description: "Food blogger",
    img: "/images/placeholder.png",
  },
  {
    username: "user9",
    password: "password9",
    description: "Gourmet chef",
    img: "/images/placeholder.png",
  },
  {
    username: "user10",
    password: "password10",
    description: "Dessert lover",
    img: "/images/placeholder.png",
  },
  {
    username: "user11",
    password: "password11",
    description: "Sauce expert",
    img: "/images/placeholder.png",
  },
  {
    username: "user12",
    password: "password12",
    description: "Soup specialist",
    img: "/images/placeholder.png",
  },
  {
    username: "user13",
    password: "password13",
    description: "Pasta enthusiast",
    img: "/images/placeholder.png",
  },
  {
    username: "user14",
    password: "password14",
    description: "Healthy eater",
    img: "/images/placeholder.png",
  },
  {
    username: "user15",
    password: "password15",
    description: "Meat lover",
    img: "/images/placeholder.png",
  },
  {
    username: "user16",
    password: "password16",
    description: "Spice king",
    img: "/images/placeholder.png",
  },
  {
    username: "user17",
    password: "password17",
    description: "Salad fan",
    img: "/images/placeholder.png",
  },
  {
    username: "user18",
    password: "password18",
    description: "Breakfast expert",
    img: "/images/placeholder.png",
  },
  {
    username: "user19",
    password: "password19",
    description: "Dinner specialist",
    img: "/images/placeholder.png",
  },
  {
    username: "user20",
    password: "password20",
    description: "Snack lover",
    img: "/images/placeholder.png",
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
      const newUser = new User({
        username: user.username,
        description: user.description,
        img: user.img,
      });
      const registeredUser = await User.register(newUser, user.password);
      createdUsers.push(registeredUser);
    }
    console.log("Users created!");

    // Creating new dishes and associating them with users
    for (let i = 0; i < dishes.length; i++) {
      // Assign each dish to a user
      const user = createdUsers[i % createdUsers.length];
      const dish = new Dish({
        name: dishes[i].name,
        img: dishes[i].img,
        likes: dishes[i].likes,
        time: dishes[i].time,
        difficulty: dishes[i].difficulty,
        ingredients: dishes[i].ingredients,
        instructions: dishes[i].instructions,
        author: user._id,
      });
      await dish.save();
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
