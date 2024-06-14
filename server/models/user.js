// import mongoose so we can create schema and model
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
  dishes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dish",
    },
  ],
});

// pre-save hook to hash password
userSchema.pre("save", function (next) {
  bcrypt
    .hash(this.password, 10)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((error) => {
      console.log(`Error hashing password: ${error.message}`);
      next(error);
    });
});

// method to compare passwords
userSchema.methods.passwordComparison = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

// hide password when schema is retrieved
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

// then export the model so we can use it in the controller
module.exports = mongoose.model("User", userSchema);
