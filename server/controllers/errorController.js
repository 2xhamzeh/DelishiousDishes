module.exports = {
  // responds with internal error code
  handleErrors: (error, req, res, next) => {
    error.status = error.status || 500;
    error.message = error.message || "Error";
    console.log(error.stack);

    return res.status(error.status).json({ message: error.message });
  },
};
