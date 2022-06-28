const Product = require("./../models/Product");
const User = require("./../models/User");
const { CustomAPIError } = require("./../errors");
const { StatusCodes } = require("http-status-codes");

//------------------------------------------------------------------
const createProduct = async (req, res) => {
  req.body.user = req.user._id;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

//------------------------------------------------------------------
const getAllProducts = async (req, res) => {
  res.send("all product");
};

//------------------------------------------------------------------
const getSingleProduct = async (req, res) => {
  res.send("get single product");
};

//------------------------------------------------------------------
const updateProduct = async (req, res) => {
  res.send("update product");
};

//------------------------------------------------------------------
const deleteProduct = async (req, res) => {
  res.send("delete product");
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
