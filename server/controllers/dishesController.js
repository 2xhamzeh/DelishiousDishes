const Dish = require("../models/dish");

module.exports = {
  create: (req, res, next) => {
    const { name, ingredients, instructions } = req.body;
    const author = req.userId; // Ensure req.userId is set by JWT middleware
    if (!name) {
      return res.status(400).send({ error: { status: 400, message: "Name is required" } });
    }
    const dish = new Dish({ name, ingredients, instructions, author });
    dish.save()
      .then((newDish) => res.status(201).send(newDish))
      .catch(next);
  },

  readAll: (req, res, next) => {
    Dish.find({})
      .populate("author", "username")
      .exec()
      .then((dishes) => res.send(dishes))
      .catch(next);
  },

  read: (req, res, next) => {
    const id = req.params.id;
    Dish.findById(id)
      .populate("author", "username")
      .exec()
      .then((dish) => {
        if (!dish) {
          return res.status(404).send();
        }
        res.send(dish);
      })
      .catch(next);
  },

  update: (req, res, next) => {
    const id = req.params.id;
    const { name, ingredients, instructions } = req.body;
    Dish.findByIdAndUpdate(id, { name, ingredients, instructions }, { new: true, runValidators: true })
      .exec()
      .then((updatedDish) => {
        if (!updatedDish) {
          return res.status(404).send();
        }
        res.send(updatedDish);
      })
      .catch(next);
  },

  delete: (req, res, next) => {
    const id = req.params.id;
    Dish.findByIdAndDelete(id)
      .exec()
      .then((deletedDish) => {
        if (!deletedDish) {
          return res.status(404).send();
        }
        res.send(deletedDish);
      })
      .catch(next);
  },
};
