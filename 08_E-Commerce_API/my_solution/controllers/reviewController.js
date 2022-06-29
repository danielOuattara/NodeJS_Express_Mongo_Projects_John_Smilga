const Review = require("./../models/Reviews");
const Product = require("./../models/Product");
const User = require("./../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utilities");

//---------------------------------------------------------------------
const createReview = async (req, res) => {
  //
  const product = await Product.findById(req.body.product);
  if (!product) {
    throw new CustomError.NotFoundError("Product unknown");
  }

  const oldReview = await Review.findOne({
    product: req.body.product,
    user: req.user._id,
  });
  if (oldReview) {
    throw new CustomError.BadRequestError(
      `Cannot create a new review on this product. But you can update your old review `
    );
  }

  req.body.user = req.user._id;
  const review = await Review.create(req.body);

  res
    .status(StatusCodes.CREATED)
    .json({ message: "review successfully created", review });
};

//---------------------------------------------------------------------
const getAllReviews = async (req, res) => {
  const reviews = await Review.find({})
    .populate({
      path: "product",
      select: "name company category image price description",
    })
    .populate({
      path: "user",
      select: "-_id name",
    });
  res.status(StatusCodes.OK).json({ count: reviews.length, reviews });
};

//---------------------------------------------------------------------
const getSingleReview = async (req, res) => {
  const review = await Review.findById(req.params.reviewId)
    .populate({
      path: "product",
      select: "name company category image price description",
    })
    .populate({
      path: "user",
      select: "-_id name",
    });

  if (!review) {
    throw new CustomError.BadRequestError(`review unknown`);
  }

  res.status(StatusCodes.OK).json({ review });
};

//---------------------------------------------------------------------
const updateReview = async (req, res) => {
  if (!req.body.title || !req.body.rating || !req.body.comment) {
    throw new CustomError.BadRequestError(
      `title, rating & comment fields are required`
    );
  }

  const review = await Review.findById(req.params.reviewId);
  if (!review) {
    throw new CustomError.BadRequestError(`review unknown`);
  }

  console.log("req.user = ", req.user);
  console.log("review.user =", review.user);
  checkPermissions(req.user, review.user);

  review.title = req.body.title;
  review.rating = req.body.rating;
  review.comment = req.body.comment;
  await review.save();

  res.json({ message: "update review succefuly", review });
};

//---------------------------------------------------------------------
const deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.reviewId);
  if (!review) {
    throw new CustomError.BadRequestError(`review unknown`);
  }
  checkPermissions(req.user, review.userId);

  await review.remove();

  res.json({ message: "delete review" });
};

//---------------------------------------------------------------------
const getSingleProductReviews = async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId });

  res.status(StatusCodes.OK).json({ count: reviews.length, reviews });
};

//---------------------------------------------------------------------
module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
};
