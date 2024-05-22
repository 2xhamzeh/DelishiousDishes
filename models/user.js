// import mongoose so we can create schema and model
const mongoose = require("mongoose");

// create the schema
const userSchema = mongoose.Schema({
  username: String,
  password: String,
});

// then export the model so we can use it in the controller
module.exports = mongoose.model("User", userSchema);
