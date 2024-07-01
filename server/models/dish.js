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
      default: [],
    },
  ],
});

// Helper function to ensure array contains at least one item
function arrayLimit(val) {
  return val.length > 0;
}

// Virtual field to count likes based on the length of the likedBy array
dishSchema.virtual("likes").get(function () {
  return this.likedBy ? this.likedBy.length : 0;
});

dishSchema.set("toJSON", { virtuals: true });
dishSchema.set("toObject", { virtuals: true });

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;
