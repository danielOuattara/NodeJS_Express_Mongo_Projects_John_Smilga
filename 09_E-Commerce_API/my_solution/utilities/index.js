const {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  destroyCookiesInResponse,
} = require("./jwt");

const { createTokenUser } = require("./createTokenUser");
const { checkPermissions } = require("./checkPermissions");

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  destroyCookiesInResponse,
  createTokenUser,
  checkPermissions,
};
