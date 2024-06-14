const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: 3,
  },
  dishes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dish",
    },
  ],
});

// Plugin passport-local-mongoose and define usernameField
userSchema.plugin(passportLocalMongoose, {
  usernameField: "username",
});

// Export the model
module.exports = mongoose.model("User", userSchema);
