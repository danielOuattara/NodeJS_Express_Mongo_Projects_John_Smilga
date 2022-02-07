const Job = require('./../models/Job.js');
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('./../errors');

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({})
    res.status(StatusCodes.OK).json({count: jobs.length, jobs});
}

const getUserAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy: req.user.userId}).sort('createdAt');
    res.status(StatusCodes.OK).send({ count: jobs.length, jobs});
}

const getOneJob = async (req, res) => {

    const { user: { userId } } = req;
    const job = await Job.findOne({
        _id: req.params.jobId,
        createdBy: userId
    })
    if(!job) {
        throw new NotFoundError(`No job found with id ${req.params.jobId}`)
    }
    res.status(StatusCodes.OK).send({job});
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}

const updateJob = async (req, res) => {
    res.send('update job');
}

const deleteUserAllJobs = async (req, res) => {
    try {
        await Job.deleteMany();
        res.send('delete job');
    } catch (error) {
        console.log(error)
        
    }
}
const deleteJob = async (req, res) => {
    try {
        await Job.deleteOne({ _id: req.body.jobId});
        res.send('delete job');
    } catch (error) {
        console.log(error)
        
    }
}



module.exports = {
    getAllJobs,
    getUserAllJobs,
    getOneJob,
    createJob,
    updateJob,
    deleteJob,
    deleteUserAllJobs,
}