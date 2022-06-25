const User = require("./../models/User");
const {
  attachCookiesToResponse,
  destroyCookiesInResponse,
} = require("./../utilities/index");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  CustomAPIError,
} = require("./../errors");

//---------------------------------------------------------------------------------------
const register = async (req, res) => {
  //
  //check user exists
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) {
    throw new BadRequestError(
      "Email address already used. Please, choose another one"
    );
  }

  // first registered user should be an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ ...req.body, role });
  const userPayload = { name: user.name, userId: user._id, role: user.role };

  // this function attaches cookies to res
  attachCookiesToResponse(res, userPayload);

  // res is completed with message of successfull registration then sent
  res
    .status(StatusCodes.CREATED)
    .json({ message: "User Created successfully" });
};

//---------------------------------------------------------------------------------------
const login = async (req, res) => {
  //
  // check email & password presents
  if (!req.body.email || !req.body.password) {
    throw new BadRequestError("Email and Password are required !");
  }

  // check user exists !
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new UnauthenticatedError("User unknown");
  }

  // check password !
  const validPassword = await user.checkPassword(req.body.password);
  if (!validPassword) {
    throw new UnauthenticatedError("User unknown");
  }

  //every thing OK

  // gather user data payload + attach cookies to response
  const userPayload = { name: user.name, userId: user._id, role: user.role };
  attachCookiesToResponse(res, userPayload);

  // send back reponse to user
  res.status(StatusCodes.OK).json({ message: "Login successfull" });
};

//-------------------------------------------------------------------------
const logout = async (req, res) => {
  destroyCookiesInResponse(res);
  res.status(StatusCodes.OK).json({message: "User is logged out"})
};

//-------------------------------------------------------------------------
module.exports = { register, login, logout };
