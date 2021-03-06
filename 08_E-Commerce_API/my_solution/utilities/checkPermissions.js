const { UnauthenticatedError } = require("./../errors");

const checkPermissions = (requestUser, ressourceUserId = "") => {
  if (requestUser.role === "admin") return;
  if (requestUser._id.toString() === ressourceUserId.toString()) return;
  throw new UnauthenticatedError("Access denied");
};

module.exports = { checkPermissions };
