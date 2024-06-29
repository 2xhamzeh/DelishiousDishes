const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// Custom getter to format the date as dd/mm/yyyy
const formatDate = (val) => {
  if (!val) return val;
  const date = new Date(val);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: 3,
  },
  description: {
    type: String,
    required: false,
  },
  dishes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dish",
    },
  ],
  img: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
    get: formatDate,
  },
  liked: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dish",
    },
  ],
});

// Add a virtual field for likes
userSchema.virtual("likes").get(function () {
  if (this.dishes && this.dishes.length > 0) {
    return this.dishes.reduce((total, dish) => total + (dish.likes || 0), 0);
  }
  return 0;
});

// Plugin passport-local-mongoose and define usernameField
userSchema.plugin(passportLocalMongoose, {
  usernameField: "username",
});

// Ensure virtuals and getters are included when converting documents to JSON
userSchema.set("toJSON", { virtuals: true, getters: true });
userSchema.set("toObject", { virtuals: true, getters: true });

// Export the model
module.exports = mongoose.model("User", userSchema);
