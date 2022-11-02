const Product = require("./../models/productModel");

/* BASICS 
----------*/

//----------------------------------------------------------------------------------------------
// const getAllProductsStatic = async (req, res) => {
//   throw new Error("testing async-error-package");
//   res.status(200).json("product testing route");
// };

//----------------------------------------------------------------------------------------------
// const getAllProductsStatic = async (req, res) => {
//   const products = await Product.find({});
//   res.status(200).json({ numberOfHits: products.length, products });
// };

//----------------------------------------------------------------------------------------------
// const getAllProductsStatic = async (req, res) => {
//   const featuredProducts = await Product.find({ featured: true });
//   res.status(200).json(featuredProducts);
// };

//----------------------------------------------------------------------------------------------
// const getAllProductsStatic = async (req, res) => {
//   const featuredProducts = await Product.find({ featured: true });
//   res
//     .status(200)
//     .json({ numberOfHits: featuredProducts.length, featuredProducts });
// };

//----------------------------------------------------------------------------------------------
const getAllProductsStatic = async (req, res) => {
  const namedProducts = await Product.find({ name: "vase table" });
  res.status(200).json({ numberOfHits: namedProducts.length, namedProducts });
};

//----------------------------------------------------------------------------------------------
// const getAllProducts = async (req, res) => {
//   throw new Error("Testing express-async-error");
//   res.status(200).json({ message: "products route" });
// };

//----------------------------------------------------------------------------------------------
// const getAllProducts = async (req, res) => {
//   res.status(200).json({ message: "products route" });
// };

//----------------------------------------------------------------------------------------------
// const getAllProducts = async (req, res) => {
//   console.log(req.query);
//   const products = await Product.find(req.query);
//   res.status(200).json({ numberOfHits: products.length, products });
// };

//----------------------------------------------------------------------------------------------
// const getAllProducts = async (req, res) => {
//   console.log("req.query = ", req.query);
//   //http://localhost:5000/api/v1/products?featured=true&page=2
//   // "page" does not exist in the model
//   const products = await Product.find(req.query);
//   res.status(200).json({ numberOfHits: products.length, products });
// };

//----------------------------------------------------------------------------------------------
// const getAllProducts = async (req, res) => {
//   console.log("req.query = ", req.query);
//   const { featured } = req.query;

//   const queryObject = {}; // test for query item first !
//   if (featured) {
//     queryObject.featured = featured === "true" ? true : false;
//   }

//   console.log("queryObject = ", queryObject);
//   const products = await Product.find(queryObject);

//   res.status(200).json({ numberOfHits: products.length, products });
// };

//----------------------------------------------------------------------------------------------
// const getAllProducts = async (req, res) => {
//   //http: //localhost:5000/api/v1/products?featured=false&company=ikea
//   console.log("req.query = ", req.query);

//   const { featured, company } = req.query;
//   const queryObject = {};

//   if (featured) {
//     queryObject.featured = featured === "true" ? true : false;
//   }
//   if (company) {
//     queryObject.company = company;
//   }

//   console.log("queryObject = ", queryObject);
//   const products = await Product.find(queryObject);
//   res.status(200).json({
//     numberOfHits: products.length,
//     products,
//   });
// };

//----------------------------------------------------------------------------------------------
// const getAllProducts = async (req, res) => {
//   //http: //localhost:5000/api/v1/products?featured=false&company=ikea
//   console.log("req.query = ", req.query);
//   const { featured, company, name } = req.query;

//   const queryObject = {};
//   if (featured) {
//     queryObject.featured = featured === "true" ? true : false;
//   }
//   if (company) {
//     queryObject.company = company;
//   }
//   if (name) {
//     // queryObject.name = name; //--> looking for exact name
//     // queryObject.name = new RegExp('^' + name, 'i'); // --> starting with name property in the property
//     // queryObject.name = new RegExp(name + '$', 'i'); // --> ending with name property in the property
//     queryObject.name = { $regex: name, $options: "i" }; // content name value
//   }

//   console.log("queryObject = ", queryObject);

//   const products = await Product.find(queryObject);
//   res.status(200).json({
//     numberOfHits: products.length,
//     products,
//   });
// };

//----------------------------------------------------------------------------------------------
// const getAllProducts = async (req, res) => {
//   console.log(req.query);
//   //   const products = await Product.find(req.query);
//   //   const products = await Product.find({}).sort('name');
//   //   const products = await Product.find({}).sort('-name');
//   const products = await Product.find({}).sort("-name -price"); // ...etc

//   res.status(200).json({ numberOfHits: products.length, products });
// };

//----------------------------------------------------------------------------------------------
/* SORT
---------- */

// const getAllProducts = async (req, res) => {
//   // OK !
//   console.log("req.query = ", req.query);

//   const { featured, company, name, sort } = req.query;
//   const queryObject = {};

//   if (featured) {
//     queryObject.featured = featured === "true" ? true : false;
//   }

//   if (company) {
//     queryObject.company = company;
//   }

//   if (name) {
//     queryObject.name = { $regex: name, $options: "i" }; // content name value
//   }

//   let sortList = null;
//   if (sort) {
//     console.log("sort =", sort);
//     sortList = sort.replace(/,/gi, " ");
//     console.log("sortList = ", sortList);
//   }

//   console.log("queryObject =", queryObject);
//   const products = await Product.find(queryObject).sort(sortList);
//   res.status(200).json({ numberOfHits: products.length, products });
// };

//-------

// const getAllProducts = async (req, res) => {
//   // OK !
//   console.log("req.query = ", req.query);

//   const { featured, company, name, sort } = req.query;
//   const queryObject = {};

//   if (featured) {
//     queryObject.featured = featured === "true" ? true : false;
//   }

//   if (company) {
//     queryObject.company = company;
//   }

//   if (name) {
//     queryObject.name = { $regex: name, $options: "i" }; // content name value
//   }
//   console.log("queryObject =", queryObject);
//   let result = Product.find(queryObject);

//   if (sort) {
//     console.log("sort =", sort);

//     // const sortList = sort.split(',').join(' ');
//     // OR
//     const sortList = sort.replace(/,/gi, " ");

//     console.log("sortList = ", sortList);
//     result = result.sort(sortList);
//   }
//   // else {  // Not necessary here
//   //     result = result.sort('createdAt')
//   // }
//   const products = await result;
//   res.status(200).json({ numberOfHits: products.length, products });
// };

//----------------------------------------------------------------------------------------------
/* SELECT & LIMIT 
-------------------*/

// const getAllProducts = async (req, res) => {
//   const products = await Product.find({}).select("name price").limit(9);
//   res.status(200).json({ numberOfHits: products.length, products });
// };

//---------

// const getAllProducts = async (req, res) => {
//   const products = await Product.find({}).select("name price").limit(null);
//   res.status(200).json({ numberOfHits: products.length, products });
// };

//---------

// const getAllProducts = async (req, res) => {
//   const products = await Product.find({}).select(null).limit(null);
//   res.status(200).json({ numberOfHits: products.length, products });
// };

//----------------------------------------------------------------------------------------------
/* SELECT & LIMIT  & SKIP */

// const getAllProducts = async (req, res) => {
//   const products = await Product.find({})
//     .sort("name")
//     .select("name price")
//     .limit(10)
//     .skip(3);
//   res.status(200).json({ numberOfHits: products.length, products });
// };

//----------------------------------------------------------------------------------------------
/* SELECT & LIMIT 
------------------*/

// const getAllProducts = async (req, res) => {
//   const { featured, company, name, sort, fields } = req.query;

//   const queryObject = {};

//   if (featured) {
//     queryObject.featured = featured === "true" ? true : false;
//   }
//   if (company) {
//     queryObject.company = company;
//   }
//   if (name) {
//     queryObject.name = { $regex: name, $options: "i" }; // content name value
//   }

//   let result = Product.find(queryObject);

//   if (sort) {
//     const sortList = sort.split(",").join(" ");
//     result = result.sort(sortList);
//   }
//   if (fields) {
//     console.log(fields);
//     const fieldsList = fields.split(",").join(" ");
//     console.log(fieldsList);
//     result = result.select(fieldsList);
//   }

//   const products = await result;
//   res.status(200).json({ numberOfHits: products.length, products });
// };

//---------

// const getAllProducts = async (req, res) => {
//   // OK !
//   console.log("req.query = ", req.query);

//   const { featured, company, name, sort, select } = req.query;
//   const queryObject = {};

//   if (featured) {
//     queryObject.featured = featured === "true" ? true : false;
//   }

//   if (company) {
//     queryObject.company = company;
//   }

//   if (name) {
//     queryObject.name = { $regex: name, $options: "i" }; // content name value
//   }

//   let sortList = null;
//   if (sort) {
//     console.log("sort =", sort);
//     sortList = sort.replace(/,/gi, " ");
//     console.log("sortList = ", sortList);
//   }

//   let selectList = null;
//   if (select) {
//     console.log("select", select);
//     selectList = select.replace(/,/gi, " ");
//     console.log("selectList = ", selectList);
//   }

//   console.log("queryObject =", queryObject);
//   const products = await Product.find(queryObject)
//     .sort(sortList)
//     .select(selectList);
//   res.status(200).json({ numberOfHits: products.length, products });
// };

/* SKIP to SETUP PAGE NUMBER 
------------------------------*/

//----------------------------------------------------------------------------------------------

// const getAllProducts = async (req, res) => {
//   const products = await Product.find({})
//     .sort("name")
//     .select("name -_id")
//     .limit(6)
//     .skip(10);
//   res.status(200).json({ numberOfHits: products.length, products });
// };

//----------------------------------------------------------------------------------------------

// const getAllProducts = async (req, res) => {
//   const { featured, company, name, sort, fields } = req.query;
//   const queryObject = {};
//   if (featured) {
//     queryObject.featured = featured === "true" ? true : false;
//   }
//   if (company) {
//     queryObject.company = company;
//   }
//   if (name) {
//     queryObject.name = { $regex: name, $options: "i" }; // contains name value
//   }

//   let result = Product.find(queryObject);

//   if (sort) {
//     const sortList = sort.split(",").join(" ");
//     result = result.sort(sortList);
//   }
//   if (fields) {
//     const fieldsList = fields.split(",").join(" ");
//     result = result.select(fieldsList);
//   }
//   // pagination setup
//   const page = Number(req.query.page) || 1;
//   const limit = Number(req.query.limit) || 7;
//   const skip = (page - 1) * limit;
//   // http://localhost:3000/api/v1/products/static?limit=10&page=3  --> page 3 gives 3 articles

//   result = result.skip(skip).limit(limit);

//   const products = await result;
//   res.status(200).json({ numberOfHits: products.length, products });
// };

//------

// const getAllProducts = async (req, res) => {
//   // OK !
//   console.log("req.query = ", req.query);

//   const { featured, company, name, sort, select } = req.query;
//   const queryObject = {};

//   if (featured) {
//     queryObject.featured = featured === "true" ? true : false;
//   }

//   if (company) {
//     queryObject.company = company;
//   }

//   if (name) {
//     queryObject.name = { $regex: name, $options: "i" }; // content name value
//   }

//   let sortList = null;
//   if (sort) {
//     sortList = sort.replace(/,/gi, " ");
//   }

//   let selectList = null;
//   if (select) {
//     selectList = select.replace(/,/gi, " ");
//   }

//   // pagination setup
//   const page = Number(req.query.page) || 1;
//   const limit = Number(req.query.limit) || 7;
//   const skip = (page - 1) * limit;

//   const allProducts = await Product.find({});
//   const numberOfArticles = allProducts.length;
//   const availablePages = Math.ceil(numberOfArticles / limit);

//   const products = await Product.find(queryObject)
//     .sort(sortList)
//     .select(selectList)
//     .skip(skip)
//     .limit(limit);
//   res
//     .status(200)
//     .json({ numberOfHits: products.length, availablePages, products });
// };

//----------------------------------------------------------------------------------------------
/* NUMERIC FILTER 
--------------------*/
// Simple case
// const getAllProducts = async (req, res) => {
//   const products = await Product.find({ price: { $gt: 30 } })
//     .sort("-price")
//     .select("name price");
//   res.status(200).json({ numberOfHits: products.length, products });
// };

//----------------------------------------------------------------------------------------------
// const getAllProducts = async (req, res) => {
//   const { featured, company, name, sort, fields, numericFilters } = req.query;
//   const queryObject = {};

//   if (featured) {
//     queryObject.featured = featured === "true" ? true : false;
//   }
//   if (company) {
//     queryObject.company = company;
//   }
//   if (name) {
//     queryObject.name = { $regex: name, $options: "i" }; // content name value
//   }
//   if (numericFilters) {
//     const operatorsMap = {
//       ">": "$gt",
//       ">=": "$gte",
//       "=": "$eq",
//       "<": "$lt",
//       "<=": "$lte",
//     };
//     console.log("numericFilters --> ", numericFilters); // numericFilters -->  price<=125,rating>4.5
//     // const regEx = /(<|<=|=|>=|>)/g; // this is not working: why ???
//     const regEx = /\b(<|<=|=|>=|>)\b/g;
//     let filters = numericFilters.replace(
//       regEx,
//       (match) => `-${operatorsMap[match]}-`
//     );

//     console.log("filters -->", filters); // filters --> price-$lte-125,rating-$gt-4.5

//     console.log("splitted ==>", filters.split(",")[0].split("-")); // --> [field, operator, value]

//     const numericFiltersFields = ["price", "rating"]; // predifined in product model (only those ones)
//     filters = filters.split(",").forEach((item) => {
//       const [field, operator, value] = item.split("-");
//       if (numericFiltersFields.includes(field)) {
//         queryObject[field] = { [operator]: Number(value) };
//       }
//     });
//   }
//   console.log(queryObject);

//   let result = Product.find(queryObject);
//   if (sort) {
//     const sortList = sort.split(",").join(" ");
//     result = result.sort(sortList);
//   } else {
//     result = result.sort("createdAt");
//   }

//   if (fields) {
//     console.log(fields);
//     const fieldsList = fields.split(",").join(" ");
//     console.log(fieldsList);
//     result = result.select(fieldsList);
//   }

//   const page = Number(req.query.page) || 1;
//   const limit = Number(req.query.limit) || 10;
//   const skip = (page - 1) * limit;
//   result = result.skip(skip).limit(limit);

//   // http://localhost:3000/api/v1/products/static?numericFilters=price<20,rating>=4.5
//   const products = await result;
//   res.status(200).json({ numberOfHits: products.length, products });
// };

//------------

const getAllProducts = async (req, res) => {
  // OK !
  console.log("req.query = ", req.query);

  const { featured, company, name, sort, select, numericFilters } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" }; // content name value
  }

  if (numericFilters) {
    const operatorsMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    console.log("numericFilters --> ", numericFilters);
    // numericFilters -->  price<=125,rating>4.5
    // const regEx = /(<|<=|=|>=|>)/g; // this is not working: why ???
    const regEx = /\b(<|<=|=|>=|>)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorsMap[match]}-`
    );

    console.log("filters -->", filters); // filters --> price-$lte-125,rating-$gt-4.5

    console.log("splitted ==>", filters.split(",")[0].split("-")); // --> [field, operator, value]

    const numericFiltersFields = ["price", "rating"]; // predifined in product model (only those ones)
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (numericFiltersFields.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let sortList = null;
  if (sort) {
    sortList = sort.replace(/,/gi, " ");
  }

  let selectList = null;
  if (select) {
    selectList = select.replace(/,/gi, " ");
  }
  // pagination setup
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 7;
  const skip = (page - 1) * limit;

  const allProducts = await Product.find({});
  const numberOfArticles = allProducts.length;
  const availablePages = Math.ceil(numberOfArticles / limit);

  const products = await Product.find(queryObject)
    .sort(sortList)
    .select(selectList)
    .skip(skip)
    .limit(limit);
  res
    .status(200)
    .json({ numberOfHits: products.length, availablePages, products });
};

//-------------------------------------------------------------------

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
