const mongoose = require("mongoose");

// no more required on Mongoose v6
const connectParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
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
exports.connectToDB = (url) => mongoose.connect(url, connectParams);
