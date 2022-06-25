const User = require("./../models/User");
const { attachCookiesToResponse } = require("./../utilities/index");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  CustomAPIError,
} = require("./../errors");

//---------------------------------------------------------------------------------------
const register = async (req, res) => {
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
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError("Email and Password are required !");
    }
    // check user exists !
    const user = await User.findOne({ email });
    if (!user) {
      throw new UnauthenticatedError("User unknown!");
    }
    // check password !
    const isPassword = await user.comparePassword(password);
    if (!isPassword) {
      throw new UnauthenticatedError("User unknown!");
    }
    //send token
    res
      .status(StatusCodes.OK)
      .json({ user: { name: user.getName() }, token: user.createJWT() });
  } catch (err) {
    res.json(err.message);
  }
};

const logout = async (req, res) => {
  res.send("Logout user");
};

//-------------------------------------------------------------------------
module.exports = { register, login, logout };
