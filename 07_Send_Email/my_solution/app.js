require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const { sendEmail, sendEmailRealAccount } = require("./controllers/sendEmail");

app.use(express.json());

// routes
app.get("/", (req, res) => {
 res.send(`
 <h1>Email Project </h1> <a href="/send">send email using ethereal</a>
 <h1>Email Project </h1> <a href="/sendReal">send real email</a>
 `);
});

app.get("/send", sendEmail);
app.get("/sendReal", sendEmailRealAccount);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3500;

const start = async () => {
 try {
  app.listen(port, () =>
   console.log(`Server is listening on port http://localhost:${port}...`),
  );
 } catch (error) {
  console.log(error);
 }
};

start();
