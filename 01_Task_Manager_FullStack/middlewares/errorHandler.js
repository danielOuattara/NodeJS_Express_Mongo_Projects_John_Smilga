
exports.errorHandler = (err, req, res, next) => {
    return res.status(err.status).json(err.message);
}
