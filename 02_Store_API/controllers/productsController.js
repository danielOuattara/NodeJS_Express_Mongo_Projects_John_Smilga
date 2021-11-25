const Product= require('./../models/productModel');

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({});
    const featured = await Product.find({featured: true})
    res.status(200).json({products})    
}

const getAllProducts = async (req, res) => {
    res.status(200).json({message:'products route'});
}

module.exports =  {
    getAllProductsStatic,
    getAllProducts
}
