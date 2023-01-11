const jwt = require("jsonwebtoken");
const CustomError = require("./../errors");
const User = require("../models/UserModel");
const { isTokenValid } = require("./../utilities");

//---------------------------------------------------------------
const tokenAuthentication = async (req, res, next) => {
  const access_token = req.signedCookies.access_token;
  if (!access_token || !access_token.startsWith("Bearer")) {
    throw new CustomError.UnauthenticatedError("Request Denied !");
  }

  try {
    const token = access_token.split(" ")[1];
    const payload = isTokenValid(token);
    // --> Better: register in "req" a complete Mongoose user object
    //             with all possible associations.
    const user = await User.findById(payload.userId).select("-password");
    req.user = user;

    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Request Denied !");
  }
};

// //--------------------------------------------------------------
// const adminAuth = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     throw new UnauthorizedError("Request Denied! Admin Access Only");
//   }
//   next();
// };

//--------------------------------------------------------------
const rolePermissions = (...roles) => {
  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Request Denied! Admin Access Only",
      );
    }
    next();
  };
};

//--------------------------------------------------------------
module.exports = { tokenAuthentication, /* adminAuth, */ rolePermissions };
