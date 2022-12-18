const User = require("./../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  CustomAPIError,
} = require("./../errors");

const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require("./../utilities");

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

// //-----------------------------------------------------------------
// const updateUser = async (req, res) => {   <-- findOneAndUpdate()
//   //
//   if (!req.body.name || !req.body.email) {
//     throw new BadRequestError("Name and Email are required !");
//   }
//   console.log("req.user = ", req.user);

//   const user = await User.findOneAndUpdate(
//     { _id: req.user._id },
//     { name: req.body.name, email: req.body.email },
//     { new: true, runValidators: true }
//   );

//   const userPayload = createTokenUser(user);

//   // this function attaches cookies to res
//   attachCookiesToResponse(res, userPayload);

//   // res is completed with message of successfull registration then sent
//   res
//     .status(StatusCodes.CREATED)
//     .json({ message: "User updated successfully" });
// };

//--- OR ---

const updateUser = async (req, res) => {
  // <-- user.save() method
  //
  if (!req.body.name || !req.body.email) {
    throw new BadRequestError("Name and Email are required !");
  }
  console.log("req.user = ", req.user);

  const user = await User.findById(req.user._id);
  user.name = req.body.name;
  user.email = req.body.email;

  await user.save();

  //   { name: req.body.name, email: req.body.email },
  //   { new: true, runValidators: true }
  // );

  const userPayload = createTokenUser(user);

  // this function attaches cookies to res
  attachCookiesToResponse(res, userPayload);

  // res is completed with message of successfull registration then sent
  res
    .status(StatusCodes.CREATED)
    .json({ message: "User updated successfully" });
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
// const getSingleUser = async (req, res) => {  // <-- my method: Working  !
//   if (req.user._id !== req.params.userId && req.user.role !== "admin") {
//     throw new UnauthenticatedError("Access denied");
//   }
//   const user = await User.findOne({ _id: req.params.userId }).select(
//     "-password"
//   );
//   if (!user) {
//     throw new NotFoundError("User Not Found");
//   }

//   res.status(StatusCodes.OK).json({ user });
// };
//

//--- OR

//
const getSingleUser = async (req, res) => {
  // <-- John's method
  checkPermissions(req.user, req.params.userId);
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
