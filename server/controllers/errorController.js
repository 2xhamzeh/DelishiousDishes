module.exports = {
  // responds with internal error code
  handleErrors: (error, req, res, next) => {
    error.message = error.message || "Error";
    error.status = error.status || 500;
    console.log(error.message);
    console.log(error.status);
    console.log(error.stack);

    return res.status(error.status).send({ message: error.message });
  },
};
