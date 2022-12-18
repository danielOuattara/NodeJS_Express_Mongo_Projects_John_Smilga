require("express-async-errors");
const express = require("express");
const app = express();

// security import
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");
const sanitizeExpressMongo = require("express-mongo-sanitize");

// routes import
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes ");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const orderRouter = require("./routes/orderRoutes");

// error handler import
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// functional middleware import
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

//-------------------------------------------------------------------------------
//
// security
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
    message: { code: 429, message: "Too many connection; Try later !" },
  })
);
app.use(helmet());
app.use(xss());
app.use(sanitizeExpressMongo());

// fonctional middlewares
// app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET)); // <-- signing cookie

app.use(express.static("./public")); // for later user
app.use(fileUpload());

// app.get("/api/v1", (req, res) => {
//   // console.log(req.cookies); // <-- accessing non signed cookies
//   console.log(req.signedCookies); // <-- accessing signed cookies
//   res.send("Welcome to E-commerce API");
// });

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
