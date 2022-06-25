const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("./../errors");
const User = require("./../models/User");
const { isTokenValid } = require("./../utilities");

//---------------------------------------------------------------
const authenticatedUser = async (req, res, next) => {
  console.log("req = ", req);
  const access_token = req.signedCookies.access_token;
  if (!access_token || !access_token.startsWith("Bearer")) {
    throw new UnauthenticatedError("Request Denied !");
  }
  const token = access_token.split(" ")[1];

  try {
    const payload = isTokenValid(token);

    // --> Better: register in "req" a complete Mongoose user object
    //             with all possible associations.
    const user = await User.findById(payload.userId).select("-password");
    req.user = user;

    next();
  } catch (error) {
    throw new UnauthenticatedError("Request Denied !");
  }
};

module.exports = { authenticatedUser };
