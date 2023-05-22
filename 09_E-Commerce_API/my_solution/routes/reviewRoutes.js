const express = require("express");
const router = express.Router();
const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const {
  tokenAuthentication: tokenAuth,
} = require("../middleware/authentication");

//----------------------------------------------------------------------

router.route("/").post(tokenAuth, createReview).get(getAllReviews);

router
  .route("/:reviewId")
  .get(getSingleReview)
  .patch(tokenAuth, updateReview)
  .delete(tokenAuth, deleteReview);

//-----------------------------------------------------------------------

module.exports = router;
