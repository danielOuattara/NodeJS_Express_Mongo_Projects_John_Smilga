require("dotenv").config();
require("express-async-errors");
const path = require("path");

// extra security packages
const helmet = require("helmet");
const xss = require("xss-clean");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");
// routers
const authRouter = require("./routes/authRoutes");
const jobsRouter = require("./routes/jobsRoutes");
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);
app.use(express.static(path.resolve(__dirname, "..", "./frontend/build")));
app.use(express.json());
app.use(helmet());
app.use(xss());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.get("*", (req, res) => {
  res
    .status(200)
    .sendFile(
      path.resolve(__dirname, "./..", "./frontend/build", "index.html"),
    );
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log(
      `Connection to MongoDB database ${process.env.MONGO_DATABASE} Success !`,
    );
    app.listen(port, () =>
      console.log(`Server is listening on port http://localhost:${port}/`),
    );
  } catch (error) {
    console.log(error);
  }
};

start();
