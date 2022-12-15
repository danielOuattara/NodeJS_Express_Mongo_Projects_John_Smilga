const { CustomAPIError } = require("./../errors/customError");

// The error variable handled here can be custom error or other error

exports.errorHandler = (error, req, res, next) => {
  if (error instanceof CustomAPIError) {
    // first testing if the error received is our custom error
    return res.status(error.statusCode).json(error.message);
  } else {
    // the error is not a custom error
    return res.status(500).json(error.message);
  }
};
