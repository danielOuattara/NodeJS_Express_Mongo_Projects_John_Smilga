const mongoose = require("mongoose");

const connectParams = {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  useUnifiedTopology: true,
};
const connectDB = (uri) => {
  return mongoose.connect(uri, connectParams);
};

module.exports = connectDB;
