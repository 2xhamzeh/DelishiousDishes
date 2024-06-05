// here we import the model
const Recipe = require("../models/recipe");

// and we can write down all the operations we want to do with it.
// we use exports.functionName to so we can use the functions where needed
// or like we're doing here we store all the functions in a table/object and export that

module.exports = {
  // sends all recipes available
  getAllRecipes: (req, res, next) => {
    Recipe.find({})
      .exec()
      .then((recipes) => {
        res.send(recipes);
      })
      .catch(next);
  },

  // adds a single recipe to database
  addRecipe: (req, res, next) => {
    const recipe = new Recipe({
      name: req.body.name,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
    });
    recipe
      .save()
      .then(() => {
        res.sendStatus(200);
      })
      .catch(next);
  },
};
