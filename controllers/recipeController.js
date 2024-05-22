// here we import the model
const Recipe = require("../models/recipe");

// and we can write down all the operations we want to do with it.
// we use exports.functionName to so we can use the functions where needed

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

exports.addRecipe = (req, res) => {
  const r = new Recipe({
    name: req.body.name,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
  });
  r.save()
    .then(() => {
      res.send(200);
    })
    .catch((error) => {
      res.send(error);
    });
};
