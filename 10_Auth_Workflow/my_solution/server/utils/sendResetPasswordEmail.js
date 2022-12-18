const sendEmail = require("./sendEmail");

//------------------------------------------------------------------
const sendResetPasswordEmail = async ({
  name,
  email,
  passwordToken,
  origin,
}) => {
  const resetPasswordLink = `${origin}/user/reset-password?token=${passwordToken}&email=${email}`;
  const message = `<p>To reset your password <a href="${resetPasswordLink}">click here</a> </p>`;

  return sendEmail({
    to: email,
    subject: "Email confirmation",
    html: `<h4> Hello ${name}</h4> ${message} `,
  });
};

//-------------------------------------------------------------------
module.exports = sendResetPasswordEmail;
