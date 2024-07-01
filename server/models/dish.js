const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Path `name` is required."],
    minlength: 2,
    maxlength: 50,
  },
  img: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  time: {
    type: Number, // assuming time is in minutes
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
  },
  ingredients: {
    type: [String],
    required: [true, "Path `ingredients` is required."],
    validate: [
      arrayLimit,
      "Path `ingredients` requires at least 1 ingredient.",
    ],
  },
  instructions: {
    type: [String],
    required: [true, "Path `instructions` is required."],
    validate: [
      arrayLimit,
      "Path `instructions` requires at least 1 instruction.",
    ],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Path `author` is required."],
  },
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// Helper function to ensure array contains at least one item
function arrayLimit(val) {
  return val.length > 0;
}

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;
