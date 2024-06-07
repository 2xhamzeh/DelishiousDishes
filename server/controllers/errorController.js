module.exports = {
  // responds with internal error code
  handleErrors: (error, req, res, next) => {
    error.message = error.message || "Error";
    error.status = error.status || 500;
    error.code = error.code || "UNKNOWN";
    console.log("Error Message: " + error.message);
    console.log(" ");
    console.log("Error Status: " + error.status);
    console.log("Error Code: " + error.code);
    console.log(" ");
    console.log(error.stack);

    return res.sendStatus(error.status);
  },
};
