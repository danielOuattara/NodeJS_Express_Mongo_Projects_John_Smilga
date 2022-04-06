const mongoose = require("mongoose");

const connectParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

exports.connectToDB = (url) => {
  return mongoose.connect(url, connectParams);
};
