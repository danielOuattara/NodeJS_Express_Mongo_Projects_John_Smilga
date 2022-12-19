const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // compare password
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      token,
    },
  });
};

// -----------------------------------------------------------
const updateUser = async (req, res) => {
  if (
    !req.body.email ||
    !req.body.name ||
    !req.body.lastName ||
    !req.body.location
  ) {
    throw new BadRequestError(
      "Email, Name, LastName and Location are all required",
    );
  }

  const user = await User.findByIdAndUpdate(req.user.userId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(generateNotFoundError(`No User found ${req.user.name} `));
  }

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      token: user.createJWT(),
    },
  });
};

module.exports = {
  register,
  login,
  updateUser,
};
