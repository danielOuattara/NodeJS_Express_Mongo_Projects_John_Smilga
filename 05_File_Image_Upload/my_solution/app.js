require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// database
const connectDB = require("./db/connect");

//router
const productRouter = require("./routes/productRoutes");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const multer = require("./middleware/multer-config");

app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("<h1>File Upload Starter</h1>");
// });

app.use("/api/v1/products", multer, productRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port http://localhost:${port}/`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
