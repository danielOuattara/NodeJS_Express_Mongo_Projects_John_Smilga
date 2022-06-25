const User = require("./../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  CustomAPIError,
} = require("./../errors");

//-----------------------------------------------------------------
const getAllUsers = async (req, res) => {
  const users = await User.find({}).select("-password");
  res.status(StatusCodes.OK).json({ nb_Hits: users.length, users });
};

//-----------------------------------------------------------------
const showCurrentUser = async (req, res) => {
  res.send("show current user");
};

//-----------------------------------------------------------------
const updateUser = async (req, res) => {
  res.send("udpate user");
};

//-----------------------------------------------------------------
const updateUserPassword = async (req, res) => {
  res.send("update user password");
};

//-----------------------------------------------------------------
const getSingleUser = async (req, res) => {
  const user = await User.find({ _id: req.params.userId });
  res.status(StatusCodes.OK).json({ nb_Hits: user.length, user });
};

//-----------------------------------------------------------------
module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
