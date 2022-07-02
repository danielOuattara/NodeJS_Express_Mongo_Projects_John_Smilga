const nodemailer = require("nodemailer");

//---------------------------------------------------------------
const sendEmail = async (link) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "saul.murray78@ethereal.email",
      pass: "fYW8wkeB2KnnuNsdUn",
    },
  });

  let info = await transporter.sendMail({
    from: '" Admin Registration" <ricatti@gmx.fr>', // sender address
    to: "admi1@test.Ca", // list of receivers
    subject: "Email verification upon Login", // Subject line
    html: `<b>Hello, click the link <a href=${link}>Confirm Email</a></b>`, // html body
  });

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  console.log("Message sent: %s", info.messageId);

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

//---------------------------------------------------------------
module.exports = sendEmail;
