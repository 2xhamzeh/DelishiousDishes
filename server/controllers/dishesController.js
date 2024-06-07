// here we import the model
const Dish = require("../models/dish");

// and we can write down all the operations we want to do with it.
// we use exports.functionName to so we can use the functions where needed
// or like we're doing here we store all the functions in a table/object and export that

module.exports = {
  // sends all recipes available
  readAll: (req, res, next) => {
    Dish.find({})
      .exec()
      .then((dishes) => {
        res.send(dishes);
      })
      .catch(next);
  },

  // adds a single recipe to database
  create: (req, res, next) => {
    const dish = new Dish({
      name: req.body.name,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
    });
    dish
      .save()
      .then(() => {
        res.sendStatus(200);
      })
      .catch(next);
  },
  read: (req, res, next) => {
    // code to read/get dish
  },
  update: (req, res, next) => {
    // code to update/edit dish info
  },
  delete: (req, res, next) => {
    // code to delete dish
  },
};
