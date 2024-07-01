const Dish = require("../models/dish");
const User = require("../models/user");

module.exports = {
  create: async (req, res, next) => {
    const { name, img, time, difficulty, ingredients, instructions } = req.body;
    const author = req.userId; // Ensure req.userId is set by JWT middleware

    if (
      !name ||
      ingredients.length === 0 ||
      instructions.length === 0 ||
      !author
    ) {
      return res.status(400).json({ error: "Missing required fields." });
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
      await User.findByIdAndUpdate(author, { $push: { dishes: newDish._id } });
      res.status(201).json(newDish);
    } catch (error) {
      console.error("Error creating dish:", error);
      next(error);
    }
  },

  readAll: async (req, res, next) => {
    try {
      const dishes = await Dish.find({}).select("name img").exec();
      res.json(dishes);
    } catch (error) {
      next(error);
    }
  },

  read: async (req, res, next) => {
    const id = req.params.id;
    try {
      const dish = await Dish.findById(id)
        .populate("author", "username img")
        .exec();
      if (!dish) {
        return res.status(404).json({ error: "Dish not found." });
      }
      res.json(dish);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    const id = req.params.id;
    const updateFields = req.body;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ error: "No fields to update provided." });
    }

    try {
      const updatedDish = await Dish.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true, runValidators: true }
      ).exec();
      if (!updatedDish) {
        return res.status(404).json({ error: "Dish not found." });
      }
      res.json(updatedDish);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    const id = req.params.id;
    try {
      const deletedDish = await Dish.findByIdAndDelete(id).exec();
      if (!deletedDish) {
        return res.status(404).json({ error: "Dish not found." });
      }
      await User.updateMany({}, { $pull: { liked: id, dishes: id } }).exec();
      res.json(deletedDish);
    } catch (error) {
      next(error);
    }
  },

  like: async (req, res, next) => {
    const userId = req.userId;
    const dishId = req.params.id;

    try {
      const dish = await Dish.findById(dishId);
      if (!dish) {
        return res.status(404).json({ error: "Dish not found." });
      }

      if (dish.likedBy.includes(userId)) {
        return res.status(400).json({ error: "Dish already liked." });
      }

      dish.likedBy.push(userId);
      await dish.save();
      await User.findByIdAndUpdate(userId, { $addToSet: { liked: dishId } });
      res.json(dish);
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
        return res.status(404).json({ error: "Dish not found." });
      }

      if (!dish.likedBy.includes(userId)) {
        return res.status(400).json({ error: "Dish not previously liked." });
      }

      dish.likedBy = dish.likedBy.filter((id) => id.toString() !== userId);
      await dish.save();
      await User.findByIdAndUpdate(userId, { $pull: { liked: dishId } });
      res.json(dish);
    } catch (error) {
      next(error);
    }
  },
};
