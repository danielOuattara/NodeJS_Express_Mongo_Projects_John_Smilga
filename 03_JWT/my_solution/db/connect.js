const mongoose = require("mongoose");

const connectDB = (url) => {
  const mongoConfig = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };

  return mongoose.connect(url, mongoConfig);
};

module.exports = connectDB;
