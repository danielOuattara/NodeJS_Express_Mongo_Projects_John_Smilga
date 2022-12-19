const Job = require("../models/JobModel");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

//-------------------------
const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query;

  // default queryObejct
  const queryObject = {
    createdBy: req.user.userId,
  };

  // updated queryObject according to queries
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  // sort jobs
  let sortItem = null;
  if (sort === "latest") {
    sortItem = "-createdAt";
  }
  if (sort === "oldest") {
    sortItem = "createdAt";
  }
  if (sort === "a-z") {
    sortItem = "position";
  }
  if (sort === "z-a") {
    sortItem = "-position";
  }

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  const jobs = await Job.find(queryObject)
    .sort(sortItem)
    .limit(limit)
    .skip(skip);

  res.status(StatusCodes.OK).json({
    jobs,
    totalJobs,
    numOfPages,
  });
};

//-------------------------
const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

//-------------------------
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

//-------------------------
const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequestError("Company or Position fields cannot be empty");
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true },
  );
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

//-------------------------
const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findByIdAndRemove({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).send();
};

//-------------------------
module.exports = {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
};
