// //----------------------------------------------- OK
// const asyncWrapper = (func) => {
//   return async (req, res, next) => {
//     try {
//       await func(req, res, next);
//     } catch (error) {
//       next(error);
//     }
//   };
// };

// module.exports = asyncWrapper;

//----------------------------------------------- OK!
const asyncWrapper = (func) => {
  return (req, res, next) => {
    try {
      func(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = asyncWrapper;

//------------------------------------------------------------------

/* 

getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).sort({ createdAt: 1 });
    res.status(200).send({ tasks });
  } catch (error) {
    res.status(500).json(err.message);
  }
};

//------------------------------------------------------------------

getAllTasks = asyncWrapper(async (req, res) => {
  try {
    const tasks = await Task.find({}).sort({ createdAt: 1 });
    res.status(200).send({ tasks });
  } catch (error) {
    res.status(500).json(err.message);
  }
});

//------------------------------------------------------------------

getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({}).sort({ createdAt: 1 });
  res.status(200).send({ tasks });
}); 

*/
