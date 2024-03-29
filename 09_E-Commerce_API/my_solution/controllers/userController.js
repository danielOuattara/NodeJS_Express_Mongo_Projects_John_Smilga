const User = require("../models/UserModel");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("./../errors");
const { attachCookiesToResponse, checkPermissions } = require("./../utilities");

//-----------------------------------------------------------------
// const getAllUsers = async (req, res) => {
//   const users = await User.find({ role: "user" }).select("-password");
//   res.status(StatusCodes.OK).json({ nb_Hits: users.length, users });
// };

//--- OR ---

// find({filter}, projection)
const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }, "-password");
  res.status(StatusCodes.OK).json({ nb_Hits: users.length, users });
};

//-----------------------------------------------------------------
// const getSingleUser = async (req, res) => {
//   /* <-- my method: Working!*/
//   if (req.user._id !== req.params.userId || req.user.role !== "admin") {
//     throw new UnauthenticatedError("Access denied");
//   }
//   const user = await User.findOne({ _id: req.params.userId }).select(
//     "-password",
//   );
//   if (!user) {
//     throw new CustomError.NotFoundError("User Not Found");
//   }

//   res.status(StatusCodes.OK).json({ user });
// };

//--- OR ---

const getSingleUser = async (req, res) => {
  /* <-- John's method */

  checkPermissions(req.user, req.params.userId);
  const user = await User.findOne({ _id: req.params.userId }).select(
    "-password",
  );
  if (!user) {
    throw new CustomError.NotFoundError("User Not Found");
  }

  res.status(StatusCodes.OK).json({ user });
};

//-----------------------------------------------------------------
const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

// //-----------------------------------------------------------------
// const updateUser = async (req, res) => {
//   /* findOneAndUpdate() method */

//   if (!req.body.name || !req.body.email) {
//     throw new CustomError.BadRequestError("Name and Email are required !");
//   }

//   const user = await User.findOneAndUpdate(
//     { _id: req.user._id },
//     { name: req.body.name, email: req.body.email },
//     { new: true, runValidators: true },
//   );
//   const userPayload = {
//     name: user.name,
//     userId: user._id,
//     role: user.role,
//   };

//   // this function attaches cookies to res
//   attachCookiesToResponse(res, userPayload);

//   // res is completed with message of successful registration then sent
//   res
//     .status(StatusCodes.CREATED)
//     .json({ message: "User updated successfully" });
// };

//--- OR ---

// const updateUser = async (req, res) => {
//   /* user.save() method */

//   if (!req.body.name || !req.body.email) {
//     throw new CustomError.BadRequestError("Name and Email are required !");
//   }

//   const user = await User.findById(req.user._id);
//   user.name = req.body.name;
//   user.email = req.body.email;

//   await user.save();

//   const userPayload = {
//     name: user.name,
//     userId: user._id,
//     role: user.role,
//   };

//   // this function attaches cookies to res
//   attachCookiesToResponse(res, userPayload);

//   // res is completed with message of successful registration then sent
//   res
//     .status(StatusCodes.CREATED)
//     .json({ message: "User updated successfully" });
// };
//--- OR ---

const updateUser = async (req, res) => {
  /* user.updateOne() method */

  if (!req.body.name || !req.body.email) {
    throw new CustomError.BadRequestError("Name and Email are required !");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new CustomError.NotFoundError("User Not Found");
  }

  await user.updateOne(req.body, { new: true, runValidators: true });

  const userPayload = {
    name: user.name,
    userId: user._id,
    role: user.role,
  };

  // this function attaches cookies to res
  attachCookiesToResponse(res, userPayload);

  // res is completed with message of successful registration then sent
  res
    .status(StatusCodes.CREATED)
    .json({ message: "User updated successfully" });
};

//-----------------------------------------------------------------
const updateUserPassword = async (req, res) => {
  //
  // check for passwords in req.body
  if (!req.body.oldPassword || !req.body.newPassword) {
    throw new CustomError.BadRequestError("Passwords are required !");
  }

  // check user exists !
  const user = await User.findOne({ _id: req.user._id });
  if (!user) {
    throw new CustomError.UnauthenticatedError("User unknown");
  }

  // check password !
  const isValidPassword = await user.checkPassword(req.body.oldPassword);
  if (!isValidPassword) {
    throw new CustomError.UnauthenticatedError("User unknown");
  }

  //every thing OK
  user.password = req.body.newPassword;
  await user.save();

  // send back response to user
  res.status(StatusCodes.OK).json({ message: "Password successfully updated" });
};

//-----------------------------------------------------------------
module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
