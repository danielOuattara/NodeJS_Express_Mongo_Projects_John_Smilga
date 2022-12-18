require("dotenv").config();
const connectDB = require("./connect");
const Product = require("./../models/Product");
const jsonProducts = require("./data/products.json");

//--------------------------------------------------------------
// Async/Await
//
// const start = async() => {
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
// .then().catch()
//
const start = () => {
  connectDB(process.env.MONGO_URI)
    .then(() => {
      console.log("Connection Success: ready to populate !");
      return Product.deleteMany({});
    })
    .then(() => {
      jsonProducts.map(item => {
        item.user = ""
      })
      return Product.create(jsonProducts);
    })
    .then(() => {
      console.log("Populate : Success !");
      process.exit(0);
    })
    .catch((error) => {
      console.log({ ERROR: error.message });
    });
};

start();

/*
 Note: 
 in Terminal, run : node database/populate.js to execute those populate function 
*/
