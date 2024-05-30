// import mongoose so we can create schema and model
const mongoose = require("mongoose");

// create the schema , we enhanced the schema of users 
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  // Adding an array to store references to another model
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }]
});


// then export the model so we can use it in the controller
module.exports = mongoose.model("User", userSchema);
