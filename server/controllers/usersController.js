// import user model
const User = require("../models/user");

module.exports = {
  // returns all users in the database
  readAll: (req, res, next) => {
    console.log("GET /api/users/ - readAll"); // Log request
    // TODO: change so passwords aren't sent back
    User.find({})
      .select("-password")
      .exec()
      .then((users) => {
        res.send(users);
      })
      .catch(next);
  },
  create: (req, res, next) => {
    console.log("POST /api/users/ - create"); // Log request
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    user
      .save()
      .then(() => {
        res.sendStatus(200);
      })
      .catch(next);
  },
  // returns a single user that matches the provided ID
  read: (req, res, next) => {
    console.log(`GET /api/users/${req.params.id} - read`); // Log request
    var userId = req.params.id;
    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send();
        }
        res.send(user);
      })
      .catch(next);
  },
  update: (req, res, next) => {
    console.log(`PUT /api/users/${req.params.id} - update`); // Log request
    var userId = req.params.id;
    User.findByIdAndUpdate(userId, req.body, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).send();
        }
        res.send(user);
      })
      .catch(next);
  },
  delete: (req, res, next) => {
    console.log(`DELETE /api/users/${req.params.id} - delete`); // Log request
    var userId = req.params.id;
    User.findByIdAndDelete(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send();
        }
        res.send(user);
      })
      .catch(next);
  },
};
