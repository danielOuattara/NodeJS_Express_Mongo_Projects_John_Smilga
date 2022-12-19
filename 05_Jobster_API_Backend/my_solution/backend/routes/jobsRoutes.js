const express = require("express");
const router = express.Router();
const {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
} = require("../controllers/jobsControllers");
const checkTestUser = require("./../middleware/checkTestUser");
//--------------------------------------------------

router.route("/").post(checkTestUser, createJob).get(getAllJobs);
router
  .route("/:id")
  .get(getJob)
  .delete(checkTestUser, deleteJob)
  .patch(checkTestUser, updateJob);

module.exports = router;
