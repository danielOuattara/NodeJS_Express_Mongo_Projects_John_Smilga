const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
//--------------------------------------------------------------------------------------

const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

//--------------------------------------------------------------------------------------
const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

//--------------------------------------------------------------------------------------
const attachCookiesToResponse = (res, payload) => {
  // creating jwt token
  const token = createJWT(payload);

  res.cookie("access_token", "Bearer " + token, {
    expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

//--------------------------------------------------------------------------------------
const destroyCookiesInResponse = (res) => {
  // change the cookie value + make it expire now !
  res.cookie("access_token", "logout requested", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
};

//--------------------------------------------------------------------------------------
module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  destroyCookiesInResponse,
};
