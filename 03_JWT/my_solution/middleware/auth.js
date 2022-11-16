// const jwt = require("jsonwebtoken");
// const CustomAPIError = require("./../errors/custom-error");

// const authenticationMiddleware = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer")) {
//     throw new CustomAPIError("No Token Provided ! ", 401);
//   }
//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const { id, username } = decoded;
//     req.user = { id, username };
//     next();
//   } catch (error) {
//     // console.log(error);
//     throw new CustomAPIError("Not Authorized ! ", 401);
//   }
// };

// module.exports = authenticationMiddleware;

//------------------------------------------------------------------------
// Using specific class error !

const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("./../errors");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("No Token Provided ! ");
  }
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
};

module.exports = authenticationMiddleware;
