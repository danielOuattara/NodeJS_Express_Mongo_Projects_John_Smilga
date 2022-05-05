const mongoose = require("mongoose");

const connectParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

exports.connectToDB = (url) => mongoose.connect(url, connectParams);
