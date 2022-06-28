const Product = require("./../models/Product");
const User = require("./../models/User");
const CustomError = require("./../errors");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const { join } = require("path");
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
  if (
    !req.files || // check file is upload
    !req.files.image.mimetype.startsWith("image") || // check image
    req.files.image.size > 1024 * 1024 // check size
  ) {
    throw new CustomError.BadRequestError(
      "Image file only required with max size 1Mb"
    );
  }
  const imagePath = path.join(
    __dirname,
    "./../public/uploads/" + `${req.files.image.name}`
  );
  await req.files.image.mv(imagePath);

  res
    .status(StatusCodes.OK)
    .json({ image: `/uploads/${req.files.image.name}` });
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
