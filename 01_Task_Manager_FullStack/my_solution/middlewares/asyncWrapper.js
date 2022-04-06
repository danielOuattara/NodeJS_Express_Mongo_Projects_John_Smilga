const asyncWrapper = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = asyncWrapper;

/* 
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({}).sort({ createdAt: 1 })
        res.status(200).send({tasks});
    } catch(error){
        res.status(500).json(err.message);
    }
}

exports.getAllTasks = asyncWrapper (async (req, res) => {
    try {
        const tasks = await Task.find({}).sort({ createdAt: 1 })
        res.status(200).send({tasks});
    } catch(error){
        res.status(500).json(err.message);
    }
})


const asyncWrapper = ( Func ) => {
    return async (req, res, next) => {
        try {
            await Func(req, res, next)
        } catch(error) {
            next(error);
        }
    }
}
 */
