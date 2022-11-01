const { CustomAPIError } = require("./../errors/customError");

// The error variable handled here can be custom error or other error

exports.errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    // first testing if the error received is our custom error
    return res.status(err.statusCode).json(err.message);
  } else {
    // the error is not a custom error
    return res.status(500).json(err.message);
  }
};
