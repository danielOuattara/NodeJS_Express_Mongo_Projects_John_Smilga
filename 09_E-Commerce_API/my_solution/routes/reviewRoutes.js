const express = require("express");
const router = express.Router();
const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const { tokenAuthentication } = require("../middleware/authentication");

//----------------------------------------------------------------------

router.route("/").post(tokenAuthentication, createReview).get(getAllReviews);

router
  .route("/:reviewId")
  .get(getSingleReview)
  .patch(tokenAuthentication, updateReview)
  .delete(tokenAuthentication, deleteReview);

//-----------------------------------------------------------------------

module.exports = router;
