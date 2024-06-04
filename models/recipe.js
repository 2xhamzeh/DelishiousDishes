// for a model we require mongoose
const mongoose = require("mongoose");
// no need to create a connection, we just want to create a schema and export a model

// create the schema
const recipeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // ingredients and instructions should be string arrays like this: [String]
  // keeping them normal strings for now for simplicity
  ingredients: {
    type: String,
  },
  instructions: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// then export the model so we can use it in the controller
module.exports = mongoose.model("Recipe", recipeSchema);

//note: we use module.exports = sth.. when we want to export a single function
// we use exports.functionName()... when we want to export many functions
