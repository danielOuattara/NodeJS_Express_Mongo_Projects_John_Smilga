
require('express-async-errors');

const express = require('express');
const app = express();
const productsRouter = require('./routes/productsRoutes')
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
// const { connectToDB } = require('./database/connect.js');

//----------------------------------------------------------------
// const start = (async() => {
//     try {
//         await connectToDB(process.env.MONGO_URI);
//         console.log(`Connection to MongoDB:  Success !`);
//     } catch (error) {
//         console.log(error.message);
//     }
// })()
// // start()

// connectToDB(process.env.MONGO_URI)
// .then(() => console.log('Connection to MongoDB:  Success !'))
// .catch((err) => console.log(err.message));
//----------------------------------------------------------------

app.use(express.json());

// routes 
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products/">products routes</a>');
});

app.use('/api/v1/products', productsRouter); // product routes

app.use(notFoundMiddleware);
app.use(errorMiddleware);


module.exports = app;

