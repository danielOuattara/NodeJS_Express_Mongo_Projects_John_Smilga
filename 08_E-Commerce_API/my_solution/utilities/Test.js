const { log, clear } = require("console");
// log(new Date(Date.now()));
// log(Date.now());

// console.clear()
const mongoose = require("mongoose");

// console.log("mongoose.Mongoose = ", mongoose.Mongoose.toString());
// console.log("mongoose = ", mongoose);

// log(mongoose instanceof mongoose.Mongoose); // true

const m = new mongoose.Mongoose();
log("m = ", m);
