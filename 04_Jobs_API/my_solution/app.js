require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// DB connection helper
const connectDB = require("./db/connect");
const auth = require("./middleware/authentication");

// routers modules
const authRouter = require("./routes/auth");
const jobRouter = require("./routes/jobs");

// error handler modules
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
// extra packages

// routes

// Routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", auth, jobRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
