require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmail = async (req, res, next) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.USER_ACCOUNT,
      pass: process.env.PASS_ACCOUNT,
    },
  });

  let info = await transporter.sendMail({
    from: '"Ricatti" <ricatti@gmx.fr>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  res.json({ info });
};

// sendEmail().catch(console.error);
module.exports = sendEmail;
