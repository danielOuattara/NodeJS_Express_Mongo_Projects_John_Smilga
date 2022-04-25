const { CustomAPIError } = require("./../errors/customError");

// The err variable handled here can be custom error or other error
exports.errorHandler = (err, req, res, next) => {
  // first testing if the error received is our custom erorr
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json(err.message);
  } else {
    // the error is not a custom error
    return res.status(500).json(err.message);
  }
};
