const express = require("express");
const router = express.Router();
const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const { tokenAuth, rolePermissions } = require("../middleware/authentication");

//----------------------------------------------------------------------

router
  .route("/")
  .post([tokenAuth, rolePermissions("admin")], createReview)
  .get(getAllReviews);

router
  .route("/:reviewId")
  .get(getSingleReview)
  .patch([tokenAuth, rolePermissions("admin")], updateReview)
  .delete([tokenAuth, rolePermissions("admin")], deleteReview);

//-----------------------------------------------------------------------

module.exports = router;
