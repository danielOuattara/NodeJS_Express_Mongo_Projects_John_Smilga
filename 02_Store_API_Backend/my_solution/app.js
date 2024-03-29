require("express-async-errors");
const express = require("express");
// const productsRouter = require("./routes/productsRoutes");
const productsRouter = require("./routes/productsRoutes");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

const app = express();

app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products/">products routes</a>');
});

app.use("/api/v1/products", productsRouter); // product routes
app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
