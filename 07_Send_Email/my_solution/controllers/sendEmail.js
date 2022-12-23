require("dotenv").config();
const nodemailer = require("nodemailer");

//--------------------------------------------------------------------
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

 // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
 console.log("Message sent: %s", info.messageId);

 // Preview only available when sending through an Ethereal account
 console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
 // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

 res.json({ info });
};
// -------------------------------------------------------------------------

const sendEmailRealAccount = async (req, res, next) => {
 const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 465,
  secure: true,
  auth: {
   user: process.env.ADMIN_EMAIL,
   pass: process.env.ADMIN_PSWD,
  },
 });

 let info = await transporter.sendMail({
  from: process.env.ADMIN_EMAIL, // sender address
  to: 'ricatti.ricci@gmail.com, "Ricatti" <ricatti@gmx.fr>, "Daniel" <daniel.ouattara@yahoo.com>', // list of receivers
  subject: "Hello ✔", // Subject line
  html: "<b>Hello world?</b>", // html body
 });

 // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
 console.log("Message sent: %s", info.messageId);

 // Preview only available when sending through an Ethereal account
 console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
 // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

 res.json({ info });
};

// sendEmail().catch(console.error);
module.exports = { sendEmail, sendEmailRealAccount };
