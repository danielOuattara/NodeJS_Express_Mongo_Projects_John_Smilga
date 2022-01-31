// const CustomAPIError = require('../errors/custom-error');

// const errorHandlerMiddleware = (err, req, res, next) => {
//   if (err instanceof CustomAPIError) {
//     return res.status(err.statusCode).json({ ErrorMessage: err.message })
//   }
//   return res.status(500).send(err.message)
// }

// module.exports = errorHandlerMiddleware


//---------------------------------------------------------------------------------
const { CustomAPIError} = require('./../errors');
const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ ErrorMessage: err.message })
  }
  return res.send(StatusCodes.INTERNAL_SERVER_ERROR).send('Server Error, try again later !');
}

module.exports = errorHandlerMiddleware
