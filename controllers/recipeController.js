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
    })
    .then(() => {
      console.log("Promise Complete");
    });
};

exports.addRecipe = (req, res) => {
  //console.log(req.body);
  const r = new Recipe({
    name: req.body.name,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
  });
  r.save()
    .then(() => {
      res.send("thanks");
    })
    .catch((error) => {
      res.send(error);
    });
  //res.send(req.body);
};
