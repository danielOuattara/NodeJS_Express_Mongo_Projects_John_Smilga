// const Task = require("./../models/task");

// //---------------------------------------------------------------------
// exports.getAllTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({}).sort({ createdAt: 1 });
//     res.status(200).send({ tasks });
//   } catch (error) {
//     res.status(500).json(err.message);
//   }
// };

// //---------------------------------------------------------------------
// exports.createTask = async (req, res) => {
//   try {
//     const task = await Task.create(req.body);
//     res.status(201).send({ task });
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// };

// //---------------------------------------------------------------------
// exports.getTask = async (req, res) => {
//   try {
//     const task = await Task.findOne({ _id: req.params.id });
//     if (!task) {
//       return res.status(404).json("Task Not Found !");
//     }
//     return res.status(200).json(task);
//   } catch (error) {
//     return res.status(500).json(error.message);
//   }
// };

// // ---
// exports.getOneTask = async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task) {
//       return res.status(404).json("Task Not Found !");
//     }
//     return res.status(200).json({ task });
//   } catch (error) {
//     return res.status(404).json(error.name);
//   }
// };

// // ---------------------------------------------------------------------

// exports.patchTask = async (req, res) => {
//   try {
//     const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!task) {
//       return res.status(404).json("Task Not Found !");
//     }
//     return res.status(200).json({ task });
//   } catch (error) {
//     return res.status(404).json(error.name);
//   }
// };

// // ---
// exports.patchTask = async (req, res) => {
//   try {
//     const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!task) {
//       return res.status(404).json("Task Not Found !");
//     }
//     return res.status(200).json({ task });
//   } catch (error) {
//     return res.status(404).json(error.name);
//   }
// };

// //---------------------------------------------------------------------
// exports.deleteTask = async (req, res) => {
//   try {
//     const task = await Task.findOneAndDelete({ _id: req.params.id });
//     if (!task) {
//       return res.status(404).json("Task Not Found !");
//     }
//     const tasks = await Task.find({}).sort({ createdAt: 1 });
//     res.status(200).send({ tasks });
//   } catch (error) {
//     return res.status(500).json(error.message);
//   }
// };

// // -----

// exports.deleteTask = async (req, res) => {
//   try {
//     const task = await Task.findByIdAndDelete(req.params.id);
//     if (!task) {
//       return res.status(404).json("Task Not Found !");
//     }
//     return res.status(200).send(`task ${req.params.id} successfully deleted !`);
//   } catch (error) {
//     return res.status(500).json(error.message);
//   }
// };

//=======================================================================

/*  asyncWrapper function to reduce repetition in controller function
------------------------------------------------------------------------*/
const Task = require("./../models/task");
const asyncWrapper = require("./../middlewares/asyncWrapper");
const { createCustomError } = require("./../errors/customError");

//---------------------------------------------------------------------
exports.getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({}).sort({ createdAt: 1 });
  res.status(200).send({ tasks });
});

//---------------------------------------------------------------------
exports.createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).send({ task });
});

//---------------------------------------------------------------------

exports.getOneTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    // Manual Error setting
    // const error = new Error('Task Not Found');
    // error.status = 404;
    // return next(error)
    return next(createCustomError("Task Not Found !", 404)); // Class Error Generator
  }
  return res.status(200).json({ task });
});

//---------------------------------------------------------------------
exports.patchTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError("Task Not Found !", 404));
  }
  console.log("task = ", task);
  return res.status(200).json({ task });
});

//---------------------------------------------------------------------
exports.deleteTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    return next(createCustomError("Task Not Found !", 404));
  }
  return res.status(200).send("done!");
  // return res.status(500).json(error.message)
});
