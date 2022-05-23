const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    //set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something wrong, try again later",
  };

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  if (err.code && err.code === 11000) {
    customError.message = `Duplicate value enterd for ${Object.keys(
      err.keyValue
    )}. Please, choose an other one !`;
    customError.statusCode = 400;
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  }
  return res.status(customError.statusCode).json({ msg: customError.message });
};

module.exports = errorHandlerMiddleware;
