const User = require("./../models/User");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  CustomAPIError,
} = require("./../errors");
const { token } = require("morgan");

//--------------------------------------------------------------------------------------
// const register = async (req, res) => { // OK
//     const user = await User.create(req.body)
//     const token = jwt.sign( // now all is handle by the User model
//         {userId: user._id },
//         process.env.JWT_SECRET,
//         {expiresIn: process.env.JWT_LIFETIME})
//     res.status(StatusCodes.CREATED).json({ user: { name: user.name},token});  // 1
//     // res.status(StatusCodes.CREATED).json({ user: { name: user.getName()},token});  // 2
// }

//---------------------------------------------------------------------------------------
const register = async (req, res) => {
  const userAlreadyExist = await User.findOne({ email: req.body.email });
  if (userAlreadyExist) {
    return res.status(404).json({
      message: "Email address already used. Please, choose another one",
    });
  }

  // first registered user should be an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";
  const user = await User.create({ ...req.body, role });

  // creating jwt token on register
  const token = jwt.sign(
    { userId: user._id, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );

  res
    .status(StatusCodes.CREATED)
    .json({ mesage: "User Created successfully", token });
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

module.exports = { register, login, logout };
