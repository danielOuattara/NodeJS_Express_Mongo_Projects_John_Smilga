const Product= require('./../models/productModel');

const getAllProductsStatic = async (req, res) => {

    /* BASIC METHODS */

    // const products = await Product.find({});
    // const featured = await Product.find({featured: true});
    // const tables = await Product.find({name: 'table'});
    // const featured = await Product.find(req.query);
    // res.status(200).json({numberOfHits: featured.length, featured})  

    // --------------------------------------------------------------------------
    
    /* QUERY */

    // const { featured, company, name } = req.query;
    // const queryObject= {};
    // if(featured) {
    //     queryObject.featured = featured === 'true' ? true : false
    // }
    // if(company) {
    //     queryObject.company = company
    // }
    // if(name) {
    //     // queryObject.name = name; // looking for exact name
    //     // queryObject.name = new RegExp('^' + name, 'i');
    //     queryObject.name = {$regex: name, $options: 'i'}  // content name value
    // }
    // console.log(queryObject);
    // const products = await Product.find(queryObject);
    // res.status(200).json({numberOfHits: products.length, products})    

    //-----------------------------------------------------------------------------
    
    /* SORT */

    // const products = await Product.find({}).sort('name');
    // const products = await Product.find({}).sort('-name');
    // const products = await Product.find({}).sort('-name -price');
    // res.status(200).json({numberOfHits: products.length, products});
    
    // const { featured, company, name, sort } = req.query;
    // const queryObject= {};
    // if(featured) {
    //     queryObject.featured = featured === 'true' ? true : false
    // }
    // if(company) {
    //     queryObject.company = company
    // }
    // if(name) {
    //     // queryObject.name = name; // looking for exact name
    //     // queryObject.name = new RegExp('^' + name, 'i');
    //     queryObject.name = {$regex: name, $options: 'i'}  // content name value
    // }
    // // console.log(queryObject);
    // let result = Product.find(queryObject);
    // if(sort) {
    //     console.log(sort);
    //     const sortList = sort.split(',').join(' ');
    //     console.log(sortList);
    //     result = result.sort(sortList)
    // }
    // else {
    //     result = result.sort('createdAt')
    // }
    // const products = await result;
    // res.status(200).json({numberOfHits: products.length, products}) 

    //---------------------------------------------------------------------

    /* SELECT & LIMIT */

    // const products = await Product.find({}).select('name price').limit(4);
    // res.status(200).json({numberOfHits: products.length, products});


    /* SELECT & LIMIT  & SKIP */

    // const products = await Product
    // .find({})
    // .sort('name')
    // .select('name price')
    // .limit(10)
    // .skip(3)
    // res.status(200).json({numberOfHits: products.length, products});
    

    /* SELECT & LIMIT  & SKIP to SETUP PAGE NUMBER */

    // const { featured, company, name, sort, fields } = req.query;
    // const queryObject= {};
    // if(featured) {
    //     queryObject.featured = featured === 'true' ? true : false
    // }
    // if(company) {
    //     queryObject.company = company;
    // }
    // if(name) {
    //     // queryObject.name = name; // looking for exact name
    //     // queryObject.name = new RegExp('^' + name, 'i');
    //     queryObject.name = {$regex: name, $options: 'i'}  // content name value
    // }
    // // console.log(queryObject);
    // let result = Product.find(queryObject);
    // if(sort) {
    //     console.log(sort);
    //     const sortList = sort.split(',').join(' ');
    //     console.log(sortList);
    //     result = result.sort(sortList);
    // }
    // else {
    //     result = result.sort('createdAt');
    // }

    // if(fields) {
    //     console.log(fields);
    //     const fieldsList = fields.split(',').join(' ');
    //     console.log(fieldsList);
    //     result = result.select(fieldsList);
    // }

    // http://localhost:3000/api/v1/products/static?sort=name&fields=name,price&limit=4&page=6

    // const page = Number(req.query.page) || 1;
    // const limit = Number(req.query.limit) || 10;
    // const skip = (page - 1 ) * limit;
    // result = result.skip(skip).limit(limit);

    // const products = await result;
    // res.status(200).json({numberOfHits: products.length, products});


    /* NUMERIC FILTER */

    const products = await Product
    .find({ price: {$gt: 30}})
    .sort('price')
    .select('name price')
    // .skip(20)
    // .limit(1)
    res.status(200).json({numberOfHits: products.length, products});

    // const { featured, company, name, sort, fields } = req.query;
    // const queryObject= {};
    // if(featured) {
    //     queryObject.featured = featured === 'true' ? true : false
    // }
    // if(company) {
    //     queryObject.company = company;
    // }
    // if(name) {
    //     // queryObject.name = name; // looking for exact name
    //     // queryObject.name = new RegExp('^' + name, 'i');
    //     queryObject.name = {$regex: name, $options: 'i'}  // content name value
    // }
    // // console.log(queryObject);
    // let result = Product.find(queryObject);
    // if(sort) {
    //     console.log(sort);
    //     const sortList = sort.split(',').join(' ');
    //     console.log(sortList);
    //     result = result.sort(sortList);
    // }
    // else {
    //     result = result.sort('createdAt');
    // }

    // if(fields) {
    //     console.log(fields);
    //     const fieldsList = fields.split(',').join(' ');
    //     console.log(fieldsList);
    //     result = result.select(fieldsList);
    // }

    // const page = Number(req.query.page) || 1;
    // const limit = Number(req.query.limit) || 10;
    // const skip = (page - 1 ) * limit;
    // result = result.skip(skip).limit(limit);

    // const products = await result;
    // res.status(200).json({numberOfHits: products.length, products});
}






const getAllProducts = async (req, res) => {
    console.log(req.query)
    res.status(200).json({message:'products route'});
}

module.exports =  {
    getAllProductsStatic,
    getAllProducts
}
