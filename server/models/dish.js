const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Path `name` is required."],
  },
  ingredients: String,
  instructions: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;