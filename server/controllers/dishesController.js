const Dish = require("../models/dish");

module.exports = {
  create: (req, res, next) => {
    const { name, picture, time, difficulty, ingredients, instructions } =
      req.body;
    const author = req.userId; // Ensure req.userId is set by JWT middleware

    if (!name || !ingredients || !instructions || !author) {
      return res
        .status(400)
        .send({ error: { status: 400, message: "Missing required fields" } });
    }

    const dish = new Dish({
      name,
      picture,
      time,
      difficulty,
      ingredients,
      instructions,
      author,
    });
    dish
      .save()
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
    const updateFields = req.body;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).send({
        error: { status: 400, message: "No fields to update provided" },
      });
    }

    Dish.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    )
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
