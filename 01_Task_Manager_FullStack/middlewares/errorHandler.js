
const { CustomAPIError } = require('./../errors/customError')


exports.errorHandler = (err, req, res, next) => {
    console.log(err)
    if(err instanceof CustomAPIError) { // If it is custom error
        return res.status(err.statusCode).json(err.message);
    }
    return res.status(500).json(err.message);
}
