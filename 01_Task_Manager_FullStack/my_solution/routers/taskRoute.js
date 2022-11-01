const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  getOneTask,
  patchTask,
  deleteTask,
} = require("../controllers/taskControllers");

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getOneTask).patch(patchTask).delete(deleteTask);

module.exports = router;
