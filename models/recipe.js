// for a model we require mongoose
const mongoose = require("mongoose");
// no need to create a connection, we just want to create a schema and export a model

// create the schema
const recipeSchema = mongoose.Schema({
  name: String,

  // ingredients and instructions should be string arrays like this: [String]
  // keeping them normal strings for now for simplicity
  ingredients: String,
  instructions: String,
});

// then export the model so we can use it in the controller
module.exports = mongoose.model("Recipe", recipeSchema);

//note: we use module.exports = sth.. when we want to export a single function
// we use exports.functionName()... when we want to export many functions
