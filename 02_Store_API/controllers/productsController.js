const Product= require('./../models/productModel');

const getAllProductsStatic = async (req, res) => {
    // const products = await Product.find({});
    // const featured = await Product.find({featured: true});
    // const tables = await Product.find({name: 'table'});
    // const featured = await Product.find(req.query);
    // res.status(200).json({numberOfHits: featured.length, featured})    
    const { featured, company, name } = req.query;
    const queryObject= {};
    if(featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if(company) {
        queryObject.company = company
    }
    if(name) {
        // queryObject.name = name; // looking for exact name
        // queryObject.name = new RegExp('^' + name, 'i');
        queryObject.name = {$regex: name, $options: 'i'}  // content name value
    }
    console.log(queryObject);
    const products = await Product.find(queryObject);
    res.status(200).json({numberOfHits: products.length, products})    
}

const getAllProducts = async (req, res) => {
    console.log(req.query)
    res.status(200).json({message:'products route'});
}

module.exports =  {
    getAllProductsStatic,
    getAllProducts
}
