const express = require("express");
const router = express.Router();
const {
  getOneJob,
  getAllJobs,
  createJob,
  updateJob,
  deleteOneJob,
  deleteAllJobs,
} = require("./../controllers/jobs");

router.route("/").post(createJob).get(getAllJobs).delete(deleteAllJobs);

router.route("/:jobId").get(getOneJob).patch(updateJob).delete(deleteOneJob);

module.exports = router;
