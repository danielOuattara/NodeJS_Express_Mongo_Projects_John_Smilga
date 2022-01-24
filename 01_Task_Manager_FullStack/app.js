require('dotenv').config();
const express = require('express');
const app = express();
const taskRouter = require('./routers/taskRoute');
const  { connectToDB }  = require('./database/connect.js');
// const  connectToDB  = require('./database/connect.js');
const { notFound } = require('./middlewares/404');
const { errorHandler } = require('./middlewares/errorHandler');


//-----------------------------------------------------------------------
// const PORT = process.env.PORT || 5000;
connectToDB(process.env.MONGO_URL)
.then(() => {
    console.log('Connection to MongoDB:  Success !');
    // app.listen(PORT, () => {
    //     console.log(`Server on PORT ${PORT}`) // in console run : PORT=6000 node app.js
    // })
})
.catch((err) => console.log(err.message));


//-----------------------------------------------------------------------s
// static assets
app.use(express.static('public'));
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

app.use('/api/v1/tasks', taskRouter);

app.use(notFound);

app.use(errorHandler);

module.exports = app;