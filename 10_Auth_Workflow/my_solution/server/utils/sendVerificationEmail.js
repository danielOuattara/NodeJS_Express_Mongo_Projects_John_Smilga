const sendEmail = require("./sendEmail");

//------------------------------------------------------------------
const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmailLink = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;
  const message = `<p>Please confirm your email: <a href="${verifyEmailLink}">click here</a> </p>`;

  return sendEmail({
    to: email,
    subject: "Email confirmation",
    html: `<h4> Hello ${name}</h4> ${message} `,
  });
};

//-------------------------------------------------------------------
module.exports = sendVerificationEmail;
