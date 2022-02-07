
require('dotenv').config();
const { connectToDB } = require('./database/connect');
const Product = require('./models/productModel');
const jsonProducts = require('./products.json');


//--------------------------------------------------------------
// const start = async() => {  OK!
//     try {
//         await connectToDB(process.env.MONGO_URI);
//         console.log("Connection Success: ready to populate !");
//         await Product.deleteMany({});
//         await Product.create(jsonProducts);
//         console.log("Populate : Success !");
//         process.exit(0);
//     } catch(error) {
//         console.log({ERROR: error.message});
//     }
// }

// start();

//----------------------------------------------------------------

const start = () => {
        connectToDB(process.env.MONGO_URI)
        .then(() =>console.log("Connection Success: ready to populate !"))
        .then(() => Product.deleteMany({}))
        .then(() => Product.create(jsonProducts))
        .then(() => console.log("Populate : Success !"))
        .then(() => process.exit(0))
        .catch((error) => {console.log({ERROR: error.message})})
}

start();

/*
 Note: in Terminal, run : node populate.js
       to execute thos populate function 
*/