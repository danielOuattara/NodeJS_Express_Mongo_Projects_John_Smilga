const CustomAPIError = require("./custom-error");
const BadRequestError = require("./bad-request-error");
const UnauthenticatedError = require("./unauthenticated-error");
const ServerError = require("./server-error");

module.exports = {
  CustomAPIError,
  BadRequestError,
  UnauthenticatedError,
  ServerError,
};
