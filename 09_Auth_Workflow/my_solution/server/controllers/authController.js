const User = require("../models/User");
const Token = require("../models/Token");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
} = require("../utils");
const crypto = require("crypto");

//---------------------------------------------------------------
const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  // generate verificationToken
  const verificationToken = crypto.randomBytes(16).toString("hex");

  // create user
  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  });

  //const origin: `${req.protocol}://${req.get("host")}`,
  // const origin = "http://localhost:3000";
  const origin = req.get("x-forwarded-host");

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });

  res.status(StatusCodes.CREATED).json({
    msg: "Registration Success, please check your email box",
  });
};

//---------------------------------------------------------------
const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne({ email, verificationToken });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Verification Failed !");
  }

  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = "";

  user.save();

  res.status(StatusCodes.OK).json({
    // verificationToken,
    // email,
    message: "Email is verified, you can login now",
  });
};

//---------------------------------------------------------------
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError(
      "Please provide email and password"
    );
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  if (!user.isVerified) {
    throw new CustomError.UnauthenticatedError(
      "Please, verify your email"
    );
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  const tokenUser = createTokenUser(user);

  let refreshToken = "";

  // check for existing refreshToken

  // create refreshToken if not previous refreshToken
  refreshToken = crypto.randomBytes(19).toString("hex");

  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  const token = await Token.create(userToken);

  attachCookiesToResponse({
    res,
    user: tokenUser,
    refreshToken: token.refreshToken,
  });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};
//---------------------------------------------------------------
const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

//---------------------------------------------------------------
module.exports = {
  register,
  verifyEmail,
  login,
  logout,
};
