const mongoose = require("mongoose");

const connectParams = {
  /* no more required on Mongoose v6+ */
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

// --------------------------------------------------------
// const connectToDB = (url) => {
//     return mongoose.connect(url, connectParams);
// }

// module.exports = connectToDB;

// --------------------------------------------------------
// exports.connectToDB = (url) => {
//   return mongoose.connect(url, connectParams);
// };

// --------------------------------------------------------
exports.connectToDB = (uri) => mongoose.connect(uri, connectParams);
