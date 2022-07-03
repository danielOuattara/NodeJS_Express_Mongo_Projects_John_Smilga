const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodeMailerConfig");
//---------------------------------------------------------------
const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(nodemailerConfig);

  let info = await transporter.sendMail({
    from: '" Admin Registration" <ricatti@gmx.fr>',
    to,
    subject,
    html,
  });

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  console.log("Message sent: %s", info.messageId);

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

//---------------------------------------------------------------
module.exports = sendEmail;
