// require("dotenv").config({ path: "./../.env" });
require("dotenv").config();
const { connectToDB } = require("./connect");
const Product = require("./../models/productModel");
const jsonProducts = require("./products.json");

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

connectToDB(process.env.MONGO_URI)
  .then(() => {
    console.log("Connection Success: ready to populate !");
    return Product.deleteMany({});
  })
  .then(() => {
    return Product.create(jsonProducts);
  })
  .then(() => {
    console.log("Populate: Success !");
    process.exit(0);
  })
  .catch((error) => {
    console.log({ ERROR: error.message });
  });

/*
 Note: 
 in Terminal, run : node database/populate.js to execute those populate function 
*/
