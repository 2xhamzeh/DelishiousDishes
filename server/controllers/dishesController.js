const Dish = require("../models/dish");
const User = require("../models/user");

module.exports = {
  create: async (req, res, next) => {
    const { name, img, time, difficulty, ingredients, instructions } = req.body;
    const author = req.userId; // Ensure req.userId is set by JWT middleware

    if (!name || !ingredients || !instructions || !author) {
      return res
        .status(400)
        .send({ error: { status: 400, message: "Missing required fields" } });
    }

    const dish = new Dish({
      name,
      img,
      time,
      difficulty,
      ingredients,
      instructions,
      author,
    });

    try {
      const newDish = await dish.save();

      // Update the author's dishes array
      await User.findByIdAndUpdate(author, {
        $push: { dishes: newDish._id },
      });

      res.status(201).send(newDish);
    } catch (error) {
      console.error(
        "Error creating dish and updating user's dishes array:",
        error
      );
      next(error);
    }
  },

  readAll: (req, res, next) => {
    Dish.find({})
      .select("name img") // Only include _id, name, and img
      .exec()
      .then((dishes) => res.send(dishes))
      .catch(next);
  },

  read: (req, res, next) => {
    const id = req.params.id;
    Dish.findById(id)
      .populate("author", "username img")
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

  delete: async (req, res, next) => {
    const id = req.params.id;

    try {
      const deletedDish = await Dish.findByIdAndDelete(id).exec();
      if (!deletedDish) {
        return res.status(404).send();
      }

      // Remove the dish ID from the liked array of all users
      await User.updateMany({ liked: id }, { $pull: { liked: id } }).exec();

      res.send(deletedDish);
    } catch (error) {
      next(error);
    }
  },

  like: async (req, res, next) => {
    console.log("like");
    const userId = req.userId;
    const dishId = req.params.id;

    try {
      const dish = await Dish.findById(dishId);
      if (!dish) {
        return res.status(404).send({ message: "Dish not found" });
      }

      // Check if the user has already liked the dish
      if (dish.likedBy.includes(userId)) {
        return res.status(400).send({ message: "Dish already liked" });
      }

      // Add the user to the dish's likedBy array
      dish.likedBy.push(userId);
      dish.likes += 1;
      await dish.save();

      // Add the dish to the user's liked array
      await User.findByIdAndUpdate(userId, { $addToSet: { liked: dishId } });

      res.status(200).send(dish);
    } catch (error) {
      next(error);
    }
  },

  unlike: async (req, res, next) => {
    const userId = req.userId;
    const dishId = req.params.id;

    try {
      const dish = await Dish.findById(dishId);
      if (!dish) {
        return res.status(404).send({ message: "Dish not found" });
      }

      // Check if the user has not liked the dish
      if (!dish.likedBy.includes(userId)) {
        return res.status(400).send({ message: "Dish not liked yet" });
      }

      // Remove the user from the dish's likedBy array
      dish.likedBy = dish.likedBy.filter((id) => id.toString() !== userId);
      dish.likes -= 1;
      await dish.save();

      // Remove the dish from the user's liked array
      await User.findByIdAndUpdate(userId, { $pull: { liked: dishId } });

      res.status(200).send(dish);
    } catch (error) {
      next(error);
    }
  },
};
