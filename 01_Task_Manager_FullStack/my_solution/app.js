const express = require("express");
const app = express();
const taskRouter = require("./routers/taskRoute");
// const { connectToDB }  = require('./database/connect');
// // const  connectToDB  = require('./database/connect.js');
const { notFound } = require("./middlewares/404");
const { errorHandler } = require("./middlewares/errorHandler");

//-----------------------------------------------------------------------

// connectToDB(process.env.MONGO_URL)
// .then(() => console.log('Connection to MongoDB:  Success !'))
// .catch((err) => console.log(err.message));

//-----------------------------------------------------------------------

app.use(express.static("./public")); // static assets
app.use(express.urlencoded({ extended: false })); // parse form data
app.use(express.json()); // parse json data

app.use("/api/v1/tasks", taskRouter);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
