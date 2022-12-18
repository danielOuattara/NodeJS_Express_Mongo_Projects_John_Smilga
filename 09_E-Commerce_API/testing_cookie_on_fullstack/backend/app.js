require("express-async-errors");
const express = require("express");
const app = express();
const authRouter = require("./routes/authRoutes");

//error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// security
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// security packages
app.use(cors());

app.use(helmet());
app.use(xss());
// app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 5000,
    max: 200,
    message: { code: 429, message: "Too many connection; Try later !" },
  })
);

// app.use(morgan("combined"))
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET)); // <-- signing cookie

app.use(express.static("./public"));

app.get("/api/v1", (req, res) => {
  // console.log(req.cookies); // <-- accessing non signed cookies
  console.log(req.signedCookies); // <-- accessing signed cookies
  res.send("Welcome to E-commerce API");
});

app.use("/api/v1/auth", authRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
