const User = require("./../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  CustomAPIError,
} = require("./../errors");

//-----------------------------------------------------------------
const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }, "-password");
  res.status(StatusCodes.OK).json({ nb_Hits: users.length, users });
};

// const getAllUsers = async (req, res) => {
//   const users = await User.find({ role: "user" }).select("-password");
//   res.status(StatusCodes.OK).json({ nb_Hits: users.length, users });
// };

//-----------------------------------------------------------------
const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

//-----------------------------------------------------------------
const updateUser = async (req, res) => {
  res.send("udpate user");
};

//-----------------------------------------------------------------
const updateUserPassword = async (req, res) => {
  //
  // check for passwords in req.body
  if (!req.body.oldPassword || !req.body.newPassword) {
    throw new BadRequestError("Passwords are required !");
  }

  // check user exists !
  const user = await User.findOne({ _id: req.user._id });
  if (!user) {
    throw new UnauthenticatedError("User unknown");
  }

  // check password !
  const validPassword = await user.checkPassword(req.body.oldPassword);
  if (!validPassword) {
    throw new UnauthenticatedError("User unknown");
  }

  //every thing OK
  user.password = req.body.newPassword;
  await user.save();

  // send back reponse to user
  res.status(StatusCodes.OK).json({ message: "Password successfully updated" });
};

//-----------------------------------------------------------------
const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.userId }).select(
    "-password"
  );
  if (!user) {
    throw new NotFoundError("User Not Found");
  }

  res.status(StatusCodes.OK).json({ user });
};

//-----------------------------------------------------------------
module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
