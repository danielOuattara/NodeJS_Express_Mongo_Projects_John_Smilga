require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const connectDB = require("./db/connect");

const productRouter = require("./routes/productRoutes");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// const multer = require("./middleware/multer-config");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
 cloud_name: process.env.CLOUDINARY_NAME,
 api_key: process.env.CLOUDINARY_KEY,
 api_secret: process.env.CLOUDINARY_SECRET,
});

//--------------------------------------------------------------------

app.use(express.static("./public")); // static assets

app.use(express.json()); // parse incoming json data
app.use(fileUpload({ useTempFiles: true }));
app.use("/api/v1/products", /* multer, */ productRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
 try {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () =>
   console.log(`Server is listening on port http://localhost:${port}/`),
  );
 } catch (error) {
  console.log(error);
 }
};

start();
