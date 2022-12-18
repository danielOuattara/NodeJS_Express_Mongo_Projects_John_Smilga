module.exports = {
  host: process.env.HOST,
  port: process.env.PORT_EMAIL,
  auth: {
    user: process.env.ADMIN,
    pass: process.env.PASS,
  },
};
