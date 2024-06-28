const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Path `name` is required."],
  },
  picture: {
    type: String,
    required: false,
  },
  likes: {
    type: Number,
    default: 0,
  },
  time: {
    type: Number, // assuming time is in minutes
    required: false,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: false,
  },
  ingredients: {
    type: [String],
    required: [true, "Path `ingredients` is required."],
  },
  instructions: {
    type: [String],
    required: [true, "Path `instructions` is required."],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Path `author` is required."],
  },
});

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;
