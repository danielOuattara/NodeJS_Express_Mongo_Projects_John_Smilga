const { UnauthenticatedError } = require("./../errors");

const checkPermissions = (requestUser, ressourceUserId) => {
  //   console.log("requestUser = ", requestUser);
  //   console.log("ressourceUserId = ", ressourceUserId);
  //   console.log("");

  if (requestUser.role === "admin") return;
  if (requestUser.userId === ressourceUserId.toString()) return;
  throw new UnauthenticatedError("Access denied");
};

module.exports = { checkPermissions };
