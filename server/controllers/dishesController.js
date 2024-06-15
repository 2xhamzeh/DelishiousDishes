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
  // returns a single dish that matches the provided ID
  read: (req, res, next) => {
    var dishId = req.params.id;
    Dish.findById(dishId)
      .then((dish) => {
        if (!dish) {
          return res.sendStatus(404);
        }
        res.send(dish);
      })
      .catch(next);
  },
  update: (req, res, next) => {
    var dishId = req.params.id;
    Dish.findByIdAndUpdate(dishId, req.body, { new: true })
      .then((dish) => {
        if (!dish) {
          return res.status(404).send();
        }
        res.send(dish);
      })
      .catch(next);
  },
  delete: (req, res, next) => {
    var dishId = req.params.id;
    Dish.findByIdAndDelete(dishId)
      .then((dish) => {
        if (!dish) {
          return res.status(404).send();
        }
        res.send(dish);
      })
      .catch(next);
  },
};
