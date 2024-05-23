const httpStatus = require("http-status-codes");

// responds with page not found error code
exports.respondNoResourceFound = (req, res) => {
  let errorCode = httpStatus.StatusCodes.NOT_FOUND;
  res.status(errorCode);
  res.render("404");
};

// responds with internal error code
exports.respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(errorCode);
  res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};

// logs errors to console
exports.logErrors = (error, req, res, next) => {
  console.error(error.stack);
  next(error);
};
