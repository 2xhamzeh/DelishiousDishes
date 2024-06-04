// import mongoose so we can create schema and model
const mongoose = require("mongoose");

// create the schema , we enhanced the schema of users
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  // Adding an array to store references to another model
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
});

userSchema.methods.getUserRecipes = function () {
  // code to return recipes of this person
};

// then export the model so we can use it in the controller
module.exports = mongoose.model("User", userSchema);
