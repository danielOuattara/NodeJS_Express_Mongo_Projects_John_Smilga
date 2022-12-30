const {
  createUserPayload,
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  destroyCookiesInResponse,
} = require("./jwt");

const { checkPermissions } = require("./checkPermissions");

module.exports = {
  createUserPayload,
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  destroyCookiesInResponse,
  createUserPayload,
  checkPermissions,
};
