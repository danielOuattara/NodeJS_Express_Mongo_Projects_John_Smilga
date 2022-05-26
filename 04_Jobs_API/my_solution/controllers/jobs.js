const Job = require("./../models/Job.js");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("./../errors");

//----------------------------------------------------------------
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user._id }).sort("createdAt");
  res.status(StatusCodes.OK).json({ count: jobs.length, jobs });
};

//----------------------------------------------------------------
const getOneJob = async (req, res) => {
  const job = await Job.findOne({
    _id: req.params.jobId,
    createdBy: req.user._id,
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
  req.body.createdBy = req.user._id;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

//----------------------------------------------------------------
const updateJob = async (req, res) => {
  if (!req.body.company || !req.body.position) {
    throw new BadRequestError("Provide Comapny and Position fields !");
  }
  const job = await Job.findOneAndUpdate(
    { _id: req.params.jobId, createdBy: req.user._id },
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
const deleteAllJobs = async (req, res) => {
  try {
    await Job.deleteMany();
    res.status(StatusCodes.OK).send("Jobs Deleted")
  } catch (error) {
    console.log(error);
  }
};

//----------------------------------------------------------------
const deleteOneJob = async (req, res) => {
  const job = await Job.findOneAndDelete({
    _id: req.params.jobId,
    createdBy: req.user._id,
  });
  if (!job) {
    throw new NotFoundError(
      `No job found with for ${req.user.name} with id ${req.params.jobId}`
    );
  }
  res.status(StatusCodes.OK).send(`Job is successfully deleted !`);
};

//-----------------------------------------------------------------
module.exports = {
  getAllJobs,
  getOneJob,
  createJob,
  updateJob,
  deleteOneJob,
  deleteAllJobs,
};
