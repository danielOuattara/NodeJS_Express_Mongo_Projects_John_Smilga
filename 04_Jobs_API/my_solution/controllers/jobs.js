const Job = require("./../models/Job.js");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("./../errors");

//----------------------------------------------------------------
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ count: jobs.length, jobs });
};

//----------------------------------------------------------------
const getUserAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).send({ count: jobs.length, jobs });
};

//----------------------------------------------------------------
const getOneJob = async (req, res) => {
  const {
    user: { userId },
  } = req;
  const job = await Job.findOne({
    _id: req.params.jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(
      `No job found with for ${req.user.name} with id ${req.params.jobId}`
    );
  }
  res.status(StatusCodes.OK).send({ job });
};

//----------------------------------------------------------------
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

//----------------------------------------------------------------
const updateJob = async (req, res) => {
  const {
    user: { userId },
    body: { company, position },
  } = req;
  if (!company || !position) {
    throw new BadRequestError("Provide Comapny and Position fields !");
  }
  const job = await Job.findOneAndUpdate(
    { _id: req.params.jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(
      `No job found with for ${req.user.name} with id ${req.params.jobId}`
    );
  }
  res.status(StatusCodes.OK).send({ job });
};

//----------------------------------------------------------------
// const updateJob = async (req, res) => {
//     const { user: { userId }, body: { company, position } } = req;
//     if(!company || !position) {
//         throw new BadRequestError('Provide Comapny and Position fields !');
//     }
//     const job = await Job.findOne({_id: req.params.jobId});
//     if(!job) {
//         throw new NotFoundError(`No job found with for ${req.user.name} with id ${req.params.jobId}`)
//     }
//     if( job.createdBy != userId) {
//         throw new UnauthenticatedError('Request Denied: Not Authorized !')
//     }
//     job.update(req.body, { new: true, runValidators: true })
//     res.status(StatusCodes.OK).send({job});
// }

//----------------------------------------------------------------
const deleteUserAllJobs = async (req, res) => {
  try {
    await Job.deleteMany();
    res.send("delete job");
  } catch (error) {
    console.log(error);
  }
};

//----------------------------------------------------------------
const deleteJob = async (req, res) => {
  const {
    user: { userId },
    body: { company, position },
  } = req;
  const job = await Job.findOneAndDelete({
    _id: req.params.jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(
      `No job found with for ${req.user.name} with id ${req.params.jobId}`
    );
  }
  res.status(StatusCodes.OK).send(`Job is successfully deleted !`);
};

module.exports = {
  getAllJobs,
  getUserAllJobs,
  getOneJob,
  createJob,
  updateJob,
  deleteJob,
  deleteUserAllJobs,
};
