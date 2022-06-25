require("express-async-errors");
const express = require("express");
const app = express();
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes ");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
// error handler

// app.use(morgan("combined"))
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET)); // <-- signing cookie

// app.use(express.static("./public")); // for later user

app.get("/api/v1", (req, res) => {
  // console.log(req.cookies); // <-- accessing non signed cookies
  console.log(req.signedCookies); // <-- accessing signed cookies
  res.send("Welcome to E-commerce API");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
