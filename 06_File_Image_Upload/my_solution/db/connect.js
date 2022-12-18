const mongoose = require("mongoose");

const connectParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const connectDB = (url) => mongoose.connect(url, connectParams);

module.exports = connectDB;
