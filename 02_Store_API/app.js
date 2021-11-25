
require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const productsRouter = require('./routes/productsRoutes')
const notFoundMiddlware = require('./middleware/not-found');
const errorMiddlware = require('./middleware/error-handler');
const { connectToDB } = require('./database/connect.js');


const PORT = process.env.PORT || 3000;
const start = async() => {
    try {
        await connectToDB(process.env.MONGO_URL);
        console.log(`Connection to MongoDB:  Success !`);
        app.listen(PORT, console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.log(error.message);
    }
}
start();

// middleware 
app.use(express.json());


// routes 

app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products/">products routes</a>');
});


app.use('/api/v1/products', productsRouter);


// product routes

app.use(notFoundMiddlware);
app.use(errorMiddlware);


