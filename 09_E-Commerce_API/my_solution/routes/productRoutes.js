const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
  uploadImage,
  populateProducts,
  // adminDeleteAllProducts,
} = require("./../controllers/productController");

const {
  tokenAuthentication: tokenAuth,
  rolePermissions: role,
} = require("./../middleware/authentication");

const {
  getSingleProductReviews,
} = require("./../controllers/reviewController");

//----------------------------------------------------------------------

router
  .route("/")
  .post([tokenAuth, role("admin")], createProduct)
  .get(getAllProducts);
// .delete([tokenAuth, role("admin")], adminDeleteAllProducts);

router.route("/upload-image").post([tokenAuth, role("admin")], uploadImage);

router
  .route("/admin-populate-products")
  .patch(tokenAuth, role("admin"), populateProducts);

router.route("/").delete(tokenAuth, role("admin"), deleteAllProducts);

router
  .route("/:productId")
  .get(getSingleProduct)
  .patch([tokenAuth, role("admin")], updateProduct)
  .delete([tokenAuth, role("admin")], deleteProduct);

router.route("/:productId/reviews").get(getSingleProductReviews);
//-----------------------------------------------------------------------

module.exports = router;
