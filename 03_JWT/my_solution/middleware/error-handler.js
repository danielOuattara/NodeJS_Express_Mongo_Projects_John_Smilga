const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors/custom-error");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ ErrorMessage: err.message });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
};

module.exports = errorHandlerMiddleware;

//---------------------------------------------------------------------------------
// const { CustomAPIError} = require('./../errors');
// const { StatusCodes } = require('http-status-codes');

// const errorHandlerMiddleware = (err, req, res, next) => {
//   if (err instanceof CustomAPIError) {
//     return res.sendStatus(err.statusCode).json({ ErrorMessage: err.message })
//   }
//   return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR).send('Server Error, try again later !');
// }

// module.exports = errorHandlerMiddleware
