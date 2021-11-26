const errorHandlerMiddleware = async (err, req, res, next) => {
  console.log(err.message);
  return res.status(500).json(err.message);
}

module.exports = errorHandlerMiddleware;