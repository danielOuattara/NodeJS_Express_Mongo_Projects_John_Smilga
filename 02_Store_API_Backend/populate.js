
require('dotenv').config();


const { connectToDB } = require('./database/connect');
const Product = require('./models/productModel');
const jsonProducts = require('./products.json');

const start = async() => {
    try {
        await connectToDB(process.env.MONGO_URL);
        console.log("Connection Success: ready to populate !");
        await Product.deleteMany({});
        await Product.create(jsonProducts);
        console.log("Populate : Success !");
        process.exit(0);
    } catch(error) {
        console.log({ERROR: error.message});
    }
}

start();