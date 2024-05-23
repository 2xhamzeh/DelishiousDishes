// here we import the model
const Recipe = require("../models/recipe");

// and we can write down all the operations we want to do with it.
// we use exports.functionName to so we can use the functions where needed

// sends all recipes available
exports.getAllRecipes = (req, res) => {
  Recipe.find({})
    .exec()
    .then((recipes) => {
      res.send(recipes);
    })
    .catch((error) => {
      console.log(error.message);
      return [];
    });
};

// adds a single recipe to database
exports.addRecipe = (req, res) => {
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
    .catch((error) => console.log(error));
};
