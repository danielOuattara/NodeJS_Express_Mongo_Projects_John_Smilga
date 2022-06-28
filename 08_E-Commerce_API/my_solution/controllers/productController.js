const Product = require("./../models/Product");
const User = require("./../models/User");
const CustomError = require("./../errors");
const { StatusCodes } = require("http-status-codes");

//------------------------------------------------------------------
const createProduct = async (req, res) => {
  req.body.user = req.user._id;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

//------------------------------------------------------------------
const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ count: products.length, products });
};

//------------------------------------------------------------------
const getSingleProduct = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (!product) {
    throw new CustomError.NotFoundError("Product not found");
  }
  res.status(StatusCodes.OK).json({ product });
};

//------------------------------------------------------------------
const updateProduct = async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.productId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!product) {
    throw new CustomError.NotFoundError("Product not found");
  }

  res
    .status(StatusCodes.OK)
    .json({ message: "Procust updated successfully", product });
};

//------------------------------------------------------------------
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (!product) {
    throw new CustomError.NotFoundError("Product not found");
  }

  await product.remove();
  res.status(StatusCodes.OK).json({ message: "Product deleted successfully" });
};

//------------------------------------------------------------------
const uploadImage = async (req, res) => {
  res.send("upload image");
};

//------------------------------------------------------------------
module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
