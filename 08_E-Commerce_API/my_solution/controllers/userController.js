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
