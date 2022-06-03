require("express-async-errors");
const express = require("express");
const app = express();
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const morgan = require("morgan");
// error handler


// app.use(morgan("combined"))
app.use(morgan("tiny"))
app.use(express.json());
app.use(express.static("./public"));

app.get("/api/v1", (req, res) => res.send("Welcome to E-commerce API"));

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
