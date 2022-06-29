const Review = require("./../models/Reviews");
const Product = require("./../models/Product");
const User = require("./../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utilities");

//---------------------------------------------------------------------
const createReview = async (req, res) => {
  console.log("req.body =", req.body);

  const product = await Product.findById(req.body.productId);
  if (!product) {
    throw new CustomError.NotFoundError("Product unknown");
  }

  const oldReview = await Review.findOne({
    product: req.body.productId,
    user: req.user._id,
  });
  if (oldReview) {
    throw new CustomError.BadRequestError(
      `Cannot create a new review on this product. But you can update your old review `
    );
  }
  req.body.userId = req.user._id;
  const review = await Review.create(req.body);

  res
    .status(StatusCodes.CREATED)
    .json({ message: "review successfully created", review });
};
//---------------------------------------------------------------------
const getAllReviews = async (req, res) => {
  res.send("get all reviews");
};
//---------------------------------------------------------------------
const getSingleReview = async (req, res) => {
  res.send("getSingle review");
};
//---------------------------------------------------------------------
const updateReview = async (req, res) => {
  res.send("update review");
};
//---------------------------------------------------------------------
const deleteReview = async (req, res) => {
  res.send("delete review");
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
