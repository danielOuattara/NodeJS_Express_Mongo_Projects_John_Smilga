const Product= require('./../models/productModel');


/* BASICS 
----------*/

//----------------------------------------------------------------------------------------------
// const getAllProductsStatic = async (req, res) => {
//     res.status(200).json('product testing route')
// }


//----------------------------------------------------------------------------------------------
const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({});
    res.status(200).json({numberOfHits: products.length, products})
}


//----------------------------------------------------------------------------------------------
// const getAllProductsStatic = async (req, res) => {
//     const featuredProducts = await Product.find({featured: true});
//     res.status(200).json(featuredProducts)
// }


//----------------------------------------------------------------------------------------------
// const getAllProductsStatic = async (req, res) => {
//     const featuredProducts = await Product.find({featured: true});
//     res.status(200).json({numberOfHits: featuredProducts.length ,featuredProducts})
// }


//----------------------------------------------------------------------------------------------
// const getAllProductsStatic = async (req, res) => {
//     const featuredProducts = await Product.find({name:"vase table"});
//     res.status(200).json({numberOfHits: featuredProducts.length ,featuredProducts})
// }


//----------------------------------------------------------------------------------------------
// const getAllProducts = async (req, res) => {
    //     //throw new Error('Testing express-async-error')
    //     res.status(200).json({ message: 'products route' });
    // }
    
    
//----------------------------------------------------------------------------------------------
// const getAllProducts = async (req, res) => {
    //     res.status(200).json({ message: 'products route'});
    // }
    
    
//----------------------------------------------------------------------------------------------
// const getAllProducts = async (req, res) => {
    //     console.log(req.query)
    //     const products = await Product.find(req.query);
    //      res.status(200).json({numberOfHits: products.length, products})
    // }
    
    
//----------------------------------------------------------------------------------------------
// const getAllProducts = async (req, res) => {
    //     console.log("req.query = ", req.query)
    //     //http://localhost:5000/api/v1/products?featured=true&page=2
    //     // "page" does not exist in the model
    //     const products = await Product.find(req.query);
    //      res.status(200).json({numberOfHits: products.length, products})
    // }
    
    
//----------------------------------------------------------------------------------------------
// const getAllProducts = async (req, res) => {
    //     const { featured } = req.query;
    //     console.log("req.query = ", req.query)
    //     const queryObject= {}; // test for query item first !
    //     if(featured) {
//         queryObject.featured = featured === 'true' ? true : false
//     }
//     console.log("queryObject = ", queryObject);
//     const products = await Product.find(queryObject);
//     res.status(200).json({numberOfHits: products.length, products}) 
// }

//----------------------------------------------------------------------------------------------
// const getAllProducts = async (req, res) => {
//     const {featured, company } = req.query;
//     console.log("req.query = ", req.query)
//     //http: //localhost:5000/api/v1/products?featured=false&company=ikea
//     const queryObject = {}; 
//     if (featured) {
//         queryObject.featured = featured === 'true' ? true : false
//     }
//     if (company) {
//         queryObject.company = company
//     }
//     console.log("queryObject = ", queryObject);
//     const products = await Product.find(queryObject);
//     res.status(200).json({
//         numberOfHits: products.length,
//         products
//     })
// }

//----------------------------------------------------------------------------------------------
// const getAllProducts = async (req, res) => {
//     const {featured, company, name } = req.query;
//     console.log("req.query = ", req.query)
//     //http: //localhost:5000/api/v1/products?featured=false&company=ikea
//     const queryObject = {}; 
//     if (featured) {
//         queryObject.featured = featured === 'true' ? true : false
//     }
//     if (company) {
//         queryObject.company = company
//     }
//     if (name) {
//         // queryObject.name = name; //--> looking for exact name
//         // queryObject.name = new RegExp('^' + name, 'i'); // --> starting with name property in the property
//         // queryObject.name = new RegExp(name + '$', 'i'); // --> ending with name property in the property
//         queryObject.name = {$regex: name, $options: 'i' } // content name value
//     }
//     console.log("queryObject = ", queryObject);
//     const products = await Product.find(queryObject);
//     res.status(200).json({
//         numberOfHits: products.length,
//         products
//     })
// }


//----------------------------------------------------------------------------------------------
// const products = await Product.find({}).sort('name');
// const products = await Product.find({}).sort('-name');
// const products = await Product.find({}).sort('-name -price');

//----------------------------------------------------------------------------------------------
// const getAllProducts = async (req, res) => {

//     const { featured, company, name, sort } = req.query;
//     const queryObject= {};

//     if(featured) {
//         queryObject.featured = featured === 'true' ? true : false;
//     }

//     if(company) {
//         queryObject.company = company;
//     }

//     if(name) {
//         // queryObject.name = name; // looking for exact name
//         // queryObject.name = new RegExp('^' + name, 'i');
//         queryObject.name = {$regex: name, $options: 'i'}  // content name value
//     }
//     console.log("queryObject =", queryObject);
//     let result = Product.find(queryObject);

//     if(sort) {
//         console.log("sort =", sort);
//         console.log("sort type =", typeof sort);
//         // const sortList = sort.split(',').join(' ');
//         const sortList = sort.replace(/,/gi , " ");
//         console.log("sortList = ", sortList);
//         result = result.sort(sortList)
//     }
    
//     else {
//         result = result.sort('createdAt')
//     }
//     const products = await result;
//     res.status(200).json({numberOfHits: products.length, products}) 
// }


/* SELECT & LIMIT 
-------------------*/

//----------------------------------------------------------------------------------------------
// const products = await Product.find({}).select('name price').limit(4);
// res.status(200).json({numberOfHits: products.length, products});


//----------------------------------------------------------------------------------------------
/* SELECT & LIMIT  & SKIP */

// const products = await Product
// .find({})
// .sort('name')
// .select('name price')
// .limit(10)
// .skip(3)
// res.status(200).json({numberOfHits: products.length, products});


/* SELECT & LIMIT 
------------------*/

//----------------------------------------------------------------------------------------------
// const getAllProducts = async (req, res) => {

//     const { featured, company, name, sort, fields } = req.query;
//     const queryObject= {};
//     if(featured) {
//         queryObject.featured = featured === 'true' ? true : false
//     }
//     if(company) {
//         queryObject.company = company;
//     }
//     if(name) {
//         // queryObject.name = name; // looking for exact name
//         // queryObject.name = new RegExp('^' + name, 'i');
//         queryObject.name = {$regex: name, $options: 'i'}  // content name value
//     }
//     // console.log(queryObject);
//     let result = Product.find(queryObject);
//     if(sort) {
//         console.log(sort);
//         const sortList = sort.split(',').join(' ');
//         console.log(sortList);
//         result = result.sort(sortList);
//     }
//     else {
//         result = result.sort('createdAt');
//     }

//     if(fields) {
//         console.log(fields);
//         const fieldsList = fields.split(',').join(' ');
//         console.log(fieldsList);
//         result = result.select(fieldsList);
//     }
        
//     const products = await result;
//     res.status(200).json({numberOfHits: products.length, products});
// }


/* SKIP to SETUP PAGE NUMBER 
------------------------------*/

//----------------------------------------------------------------------------------------------
// const products = await Product.find({}).sort('name').select('name price').limit(10).skip(3)

//----------------------------------------------------------------------------------------------
// const getAllProducts = async (req, res) => {

//     const { featured, company, name, sort, fields } = req.query;
//     const queryObject= {};
//     if(featured) {
//         queryObject.featured = featured === 'true' ? true : false
//     }
//     if(company) {
//         queryObject.company = company;
//     }
//     if(name) {
//         // queryObject.name = name; // looking for exact name
//         // queryObject.name = new RegExp('^' + name, 'i');
//         queryObject.name = {$regex: name, $options: 'i'}  // content name value
//     }
//     // console.log(queryObject);
//     let result = Product.find(queryObject);
//     if(sort) {
//         console.log(sort);
//         const sortList = sort.split(',').join(' ');
//         console.log(sortList);
//         result = result.sort(sortList);
//     }
//     else {
//         result = result.sort('createdAt');
//     }

//     if(fields) {
//         console.log(fields);
//         const fieldsList = fields.split(',').join(' ');
//         console.log(fieldsList);
//         result = result.select(fieldsList);
//     }

//     // http://localhost:3000/api/v1/products/static?limit=10&page=3  --> page 3 gives 3 articles

//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 10;
//     const skip = (page - 1 ) * limit;
//     result = result.skip(skip).limit(limit);

//     const products = await result;
//     res.status(200).json({numberOfHits: products.length, products});
// }



/* NUMERIC FILTER 
--------------------*/

//----------------------------------------------------------------------------------------------
// Simple case

// const products = await Product  
// .find({ price: {$gt: 30}})
// .sort('price')
// .select('name price')
// // .skip(20)
// // .limit(1)
// res.status(200).json({numberOfHits: products.length, products});


//----------------------------------------------------------------------------------------------
const getAllProducts = async (req, res) => {

    const { featured, company, name, sort, fields, numericFilters } = req.query;
    const queryObject= {};
    if(featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if(company) {
        queryObject.company = company;
    }
    if(name) {
        // queryObject.name = name; // looking for exact name
        // queryObject.name = new RegExp('^' + name, 'i');
        queryObject.name = {$regex: name, $options: 'i'}  // content name value
    }

    
    if(numericFilters) {

        console.log("numericsfilters -->", numericFilters);
        console.log("req.query = ", req.query)

        const operatorsMap = {
            '>':'$gt',
            '>=':'$gte',
            '=': '$eq',
            '<':'$lt',
            '<=':'$lte',
        };
        const regEx = /\b(<|<=|=|>=|>)\b/g;
        let filters = numericFilters.replace(regEx, (match) => `-${operatorsMap[match]}-`);

        console.log('filters -->', filters);
        // console.log('splitted ==>', filters.split(',')[0].split("-")) // --> [field, operator, value]

        const options = ['price', 'rating'];        
        filters = filters.split(',').forEach( (item) => {
            const [ field, operator, value ] = item.split('-');
            if(options.includes(field)) {
              queryObject[field]= { [operator]: Number(value)}
            }
        });
    }
    console.log(queryObject);

    let result = Product.find(queryObject);
    if(sort) {
        console.log(sort);
        const sortList = sort.split(',').join(' ');
        console.log(sortList);
        result = result.sort(sortList);
    }
    else {
        result = result.sort('createdAt');
    }

    if(fields) {
        console.log(fields);
        const fieldsList = fields.split(',').join(' ');
        console.log(fieldsList);
        result = result.select(fieldsList);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1 ) * limit;
    result = result.skip(skip).limit(limit);


    // http://localhost:3000/api/v1/products/static?numericFilters=price<20,rating>=4.5
    const products = await result;
    res.status(200).json({numberOfHits: products.length, products});
}


module.exports =  {
    getAllProductsStatic,
    getAllProducts
}
