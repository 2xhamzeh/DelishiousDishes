
const mongoose = require("mongoose");

// Create the schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// Export the model so we can use it in the controller
module.exports = mongoose.model("Post", postSchema);
