const httpStatus = require("http-status-codes");

module.exports = {
  // responds with page not found error code
  respondNoResourceFound: (req, res) => {
    let errorCode = httpStatus.StatusCodes.NOT_FOUND;
    res.status(errorCode);
    res.render("404");
  },

  // responds with internal error code
  respondInternalError: (error, req, res) => {
    //let errorCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
    // res.status(errorCode);
    // res.send(
    //   `${errorCode} | Sorry, our application is experiencing a problem!`
    // );
    res.send(error);
  },
  // logs errors to console
  logErrors: (error, req, res, next) => {
    console.error(error.stack);
    next(error);
  },
};
