//-----------------------------------------------------------------------

// const { CustomAPIError } = require("./../errors");
// const { StatusCodes } = require("http-status-codes");

// const errorHandlerMiddleware = (err, req, res, next) => {
//   if (err instanceof CustomAPIError) {
//     return res.status(err.statusCode).json({ ErrorMessage: err.message });
//   }
//   return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
// };

// module.exports = errorHandlerMiddleware;

//-------------------------------------------------------------------------

const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  // --> set default
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something wrong, try again later",
  };

  if (err.name === "ValidationError") {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(" ");
    customError.statusCode = 400;
  }

  if (err.code && err.code === 11000) {
    customError.message = `Duplicate ${Object.keys(
      err.keyValue
    )}: ${Object.values(err.keyValue)} Please, choose another one !`;
    customError.statusCode = 400;
  }
  return res.status(customError.statusCode).json({ msg: customError.message });
};

module.exports = errorHandlerMiddleware;
