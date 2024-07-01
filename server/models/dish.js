const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Path `name` is required."],
  },
  img: {
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
  likedBy: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: false,
  },
});

// Post-save middleware to update user's dishes array
// dishSchema.post("save", async function (doc) {
//   try {
//     await mongoose.model("User").findByIdAndUpdate(doc.author, {
//       $push: { dishes: doc._id },
//     });
//   } catch (error) {
//     console.error("Error updating user's dishes array:", error);
//   }
// });

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;
