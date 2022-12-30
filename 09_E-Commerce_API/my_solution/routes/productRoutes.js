const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
  populateProducts,
  // adminDeleteAllProducts,
} = require("./../controllers/productController");

const {
  tokenAuthentication,
  rolePermissions,
} = require("./../middleware/authentication");

const {
  getSingleProductReviews,
} = require("./../controllers/reviewController");

//----------------------------------------------------------------------

router
  .route("/")
  .post([tokenAuthentication, rolePermissions("admin")], createProduct)
  .get(getAllProducts);
// .delete([tokenAuthentication, rolePermissions("admin")], adminDeleteAllProducts);

router
  .route("/uploadImage")
  .post([tokenAuthentication, rolePermissions("admin")], uploadImage);
router
  .route("/admin-populate-products")
  .patch(tokenAuthentication, rolePermissions("admin"), populateProducts);

router
  .route("/:productId")
  .get(getSingleProduct)
  .patch([tokenAuthentication, rolePermissions("admin")], updateProduct)
  .delete([tokenAuthentication, rolePermissions("admin")], deleteProduct);

router.route("/:productId/reviews").get(getSingleProductReviews);
//-----------------------------------------------------------------------

module.exports = router;
