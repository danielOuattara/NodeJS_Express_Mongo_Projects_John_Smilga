
const express = require('express');
const router = express.Router();
const { getOneJob, getAllJobs, getUserAllJobs, createJob, updateJob, deleteJob, deleteUserAllJobs} = require('./../controllers/jobs');

router.route('/')
    .post(createJob)
    .get(getAllJobs);

router.route('/user/')
    .get(getUserAllJobs)
    .delete(deleteUserAllJobs);

router.route('/:jobId')
    .get(getOneJob)
    .patch(updateJob)
    .delete(deleteJob);

module.exports = router;