const { UnauthenticatedError } = require("./../errors");

const checkPermissions = (requestUser, resourceUserId = "") => {
  if (requestUser.role === "admin") return;
  if (requestUser._id.toString() === resourceUserId.toString()) return;
  throw new UnauthenticatedError("Access denied");
};

module.exports = { checkPermissions };
