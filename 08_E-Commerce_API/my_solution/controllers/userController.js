const User = require("./../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  CustomAPIError,
} = require("./../errors");


//---------------------------------------------------------------------------------------
const getAllUsers = async (req, res) => {

};

//---------------------------------------------------------------------------------------
const getSingleUser = async (req, res) => {};

//---------------------------------------------------------------------------------------
const showCurrentUser = async (req, res) => {};

//---------------------------------------------------------------------------------------
const updateUser = async (req, res) => {};

//---------------------------------------------------------------------------------------
const updateUserPassword = async (req, res) => {};

//-------------------------------------------------------------------------
module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
