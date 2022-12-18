const jwt = require("jsonwebtoken");

//------------------------------------------------------------------
const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

//------------------------------------------------------------------
const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

//------------------------------------------------------------------
// Before refresh Token

// const attachCookiesToResponse = ({ res, user }) => {
//   const token = createJWT({ payload: user });
//
//   const oneDay = 1000 * 60 * 60 * 24;

//   res.cookie('token', token, {
//     httpOnly: true,
//     expires: new Date(Date.now() + oneDay),
//     secure: process.env.NODE_ENV === 'production',
//     signed: true,
//   });

//   res.cookie('refreshToken', refreshToken, {
//     httpOnly: true,
//     expires: new Date(Date.now() + oneDay),
//     secure: process.env.NODE_ENV === 'production',
//     signed: true,
//   });
// };

//------------------------------------------------------------------
// For token & refreshToken
//
const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  const accessTokenJWT = createJWT({ payload: { user } });
  const refreshTokenJWT = createJWT({ payload: { user, refreshToken } });

  const longLength = 1000 * 60 * 60 * 12; // 12 hours
  const shortLength = 1000 * 60 * 60 * 1; // 1 hours

  res.cookie("accessToken", accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    maxAge: shortLength,
  });

  res.cookie("refreshToken", refreshTokenJWT, {
    httpOnly: true,
    expires: new Date(Date.now() + longLength),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

//------------------------------------------------------------------
module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
