require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

const mainRouter = require("./routes/main");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middlewares
app.use(express.static("./public"));
app.use(express.json());

// routes middlewares
app.use("/api/v1", mainRouter);

//error middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const startApplication = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on http://localhost:${port}/  `)
    );
  } catch (error) {
    console.log(error);
  }
};

startApplication();
