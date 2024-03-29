const User = require(".././models/User");
const Login = require("./../models/Login");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  attachCookiesToResponse,
  sendVerificationEmail,
  sendResetPasswordEmail,
  createHash,
} = require("../utils");
const crypto = require("crypto");

//---------------------------------------------------------------------------
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

  // const origin= `${req.protocol}://${req.get("host")}`,
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

//---------------------------------------------------------------------------
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
    message: "Email is verified, you can login now",
  });
};

//---------------------------------------------------------------------------
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  if (!user.isVerified) {
    throw new CustomError.UnauthenticatedError("Please, verify your email");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  const userPayload = {
    name: user.name,
    userId: user._id,
    role: user.role,
  };

  let refreshToken = "";

  // check for existing refreshToken and take correct action
  const existingUserLogin = await Login.findOne({ userId: user._id });

  if (existingUserLogin && existingUserLogin["isValid"] === false) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  if (existingUserLogin && existingUserLogin["isValid"] === true) {
    attachCookiesToResponse({
      res,
      user: userPayload,
      refreshToken: existingUserLogin.refreshToken,
    });
    return res.status(StatusCodes.OK).json({ user: userPayload });
  }

  // create refreshToken if not previous refreshToken
  refreshToken = crypto.randomBytes(19).toString("hex");

  const userLoginPayload = {
    refreshToken,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
    userId: user._id,
  };

  const userLogin = await Login.create(userLoginPayload);

  attachCookiesToResponse({
    res,
    user: userPayload,
    refreshToken: userLogin.refreshToken,
  });

  return res.status(StatusCodes.OK).json({ user: userPayload });
};

//---------------------------------------------------------------------------
const logout = async (req, res) => {
  await Login.findOneAndDelete({ userId: req.user.userId });
  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

//---------------------------------------------------------------------------
const forgotPassword = async (req, res) => {
  if (!req.body.email) {
    throw new CustomError.BadRequestError("Please provide email");
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    // generate passwordToken
    const passwordToken = crypto.randomBytes(31).toString("hex");

    const lengthtime = 1000 * 60 * 5; // 5 mins
    const passwordTokenExpiration = new Date(Date.now() + lengthtime);

    const origin = req.get("x-forwarded-host");

    await sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      passwordToken,
      origin,
    });
    // update user infos

    user.passwordToken = createHash(passwordToken);
    user.passwordTokenExpiration = passwordTokenExpiration;
    await user.save();
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Please check your email for more instructions" });
};

//---------------------------------------------------------------------------
const resetPassword = async (req, res) => {
  const { password, passwordConfirm, token, email } = req.body;

  if (!password || !passwordConfirm) {
    throw new CustomError.BadRequestError(
      "Please provide both password and confirmation password"
    );
  }

  if (password !== passwordConfirm) {
    throw new CustomError.BadRequestError(
      "Password and confirmation password must be identical,Please try again"
    );
  }

  if (!email || !token) {
    throw new CustomError.BadRequestError(
      "Something went wrong, please try again"
    );
  }

  // grasp user
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  // check expiration token
  if (Date.parse(user.passwordTokenExpiration) < Date.now()) {
    throw new CustomError.BadRequestError("Token expired, please try again");
  }

  if (user.passwordToken !== createHash(token)) {
    throw new CustomError.UnauthenticatedError(
      "Invalid Credentials, please try again"
    );
  }

  // update user
  user.password = password;
  user.passwordToken = "";
  user.passwordTokenExpiration = "";
  await user.save();

  res
    .status(StatusCodes.OK)
    .json({ msg: "Password update success, you can login now" });
};

//---------------------------------------------------------------------------
module.exports = {
  register,
  verifyEmail,
  login,
  logout,
  forgotPassword,
  resetPassword,
};
