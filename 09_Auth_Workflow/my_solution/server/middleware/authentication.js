const CustomError = require("../errors");
const { isTokenValid } = require("../utils");
const Login = require("./../models/Login");
const { attachCookiesToResponse } = require("./../utils/index");

//------------------------------------------------------------
const authenticateUser = async (req, res, next) => {
  const { accessToken, refreshToken } = req.signedCookies;

  // 1 : check "accessToken" cookie
  if (accessToken) {
    const accessTokenPayload = isTokenValid(accessToken);
    req.user = accessTokenPayload.user;
    return next();
  }

  // 2 : check "refreshToken" in order to renew all accessToken
  if (refreshToken) {
    const refreshTokenPayload = isTokenValid(refreshToken);

    // get userLogin informations, to check for 'isValid'
    const userLogin = await Login.findOne({
      userId: refreshTokenPayload.user.userId,
      refreshToken: refreshTokenPayload.refreshToken,
    });

    // or block the user, depending on "isvalid" is true/false
    if (!userLogin || !userLogin["isValid"]) {
      throw new CustomError.UnauthenticatedError("Authentication Invalid");
    }

    // if all OK, renew all accessToken
    attachCookiesToResponse({
      res,
      refreshToken: refreshTokenPayload.refreshToken,
      user: refreshTokenPayload.user,
    });

    req.user = refreshTokenPayload.user;
    return next();
    //
  } else {
    // No tokens found, user must login again
    throw new CustomError.UnauthenticatedError(
      "all tokens expired, please login again"
    );
  }
};

//--------------------------------------------------------------------------
const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

//--------------------------------------------------------------------------
module.exports = {
  authenticateUser,
  authorizePermissions,
};
