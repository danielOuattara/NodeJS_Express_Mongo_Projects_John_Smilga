const Product = require("./../models/Product");
const { StatusCodes } = require("http-status-codes");

const createProduct = async (req, res, next) => {
  //   res.send("create product");
  console.log(req.body);
  const product = await Product.create({ ...req.body });
  res.status(StatusCodes.CREATED).json(product);
};
const getAllProducts = async (req, res, next) => {
  res.send("list all products");
};

module.exports = { createProduct, getAllProducts };
