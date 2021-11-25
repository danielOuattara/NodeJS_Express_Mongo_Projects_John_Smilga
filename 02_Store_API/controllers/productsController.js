

const getAllProductsStatic = async (req, res) => {
    throw new Error('Error testing')
    res.status(200).json({message:'product testing route'})    
}

const getAllProducts = async (req, res) => {
    res.status(200).json({message:'products route'});
}

module.exports =  {
    getAllProductsStatic,
    getAllProducts
}
