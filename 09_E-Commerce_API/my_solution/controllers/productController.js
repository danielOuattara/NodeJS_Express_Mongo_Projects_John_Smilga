const Product = require("./../models/Product");
const CustomError = require("./../errors");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const productsJson = require("./../mockData/products.json");

//------------------------------------------------------------------
const createProduct = async (req, res) => {
  req.body.user = req.user._id; // user id is required in product model
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

//------------------------------------------------------------------
const getAllProducts = async (req, res) => {
  const products = await Product.find({}).populate("reviews");
  res.status(StatusCodes.OK).json({ count: products.length, products });
};

//------------------------------------------------------------------
const getSingleProduct = async (req, res) => {
  const product = await Product.findById(req.params.productId).populate(
    "reviews",
  );
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
    { new: true, runValidators: true },
  );
  if (!product) {
    throw new CustomError.NotFoundError("Product not found");
  }

  res
    .status(StatusCodes.OK)
    .json({ message: "Product updated successfully", product });
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
const deleteAllProducts = async (req, res) => {
  await Product.deleteMany({});
  res
    .status(StatusCodes.OK)
    .json({ message: "All Products deleted successfully" });
};
//------------------------------------------------------------------

// TODO: find a way to delete all products and every subdocument(s) related to
// const adminDeleteAllProducts = async (req, res) => {
//   const products = await Product.deleteMany({});
//   res
//     .status(StatusCodes.OK)
//     .json({ message: " All Products deleted successfully" });
// };

//------------------------------------------------------------------
const uploadImage = async (req, res) => {
  if (
    !req.files || // check file is upload
    !req.files.image.mimetype.startsWith("image") || // check image
    req.files.image.size > 1024 * 1024 // check size
  ) {
    throw new CustomError.BadRequestError(
      "Only image files with a max size 1Mb are accepted",
    );
  }
  // define the final path where to store the image
  const imagePath = path.join(
    __dirname,
    "./../public/uploads/" + `${req.files.image.name}`,
  );
  console.log("__dirname = ", __dirname);
  console.log("imagePath = ", imagePath);

  await req.files.image.mv(imagePath);

  res
    .status(StatusCodes.OK)
    .json({ image: `/uploads/${req.files.image.name}` });
};
//------------------------------------------------------------------
// TODO: admin populate products in DB
const populateProducts = async (req, res) => {
  productsJson.map((item) => (item.user = req.user._id));
  const products = await Product.updateMany({
    $setOnInsert: productsJson,
    upsert: true,
    new: true,
    runValidators: true,
  });
  // return await Foo.findOneAndUpdate(
  //   filter, // find a document with that filter
  //   { $setOnInsert: fooDoc }, // document to insert when nothing was found
  //   { upsert: true }
  // );
  res.status(StatusCodes.CREATED).json({ products });
};

//------------------------------------------------------------------
module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
  uploadImage,
  populateProducts,
  // adminDeleteAllProducts,
};
