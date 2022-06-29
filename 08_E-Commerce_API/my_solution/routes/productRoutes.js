const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
  // adminDeleteAllProducts,
} = require("./../controllers/productController");

const {
  tokenAuth,
  rolePermissions,
} = require("./../middleware/authentication");

const {
  getSingleProductReviews,
} = require("./../controllers/reviewController");

//----------------------------------------------------------------------

router.route("/")
  .post([tokenAuth, rolePermissions("admin")], createProduct)
  .get(getAllProducts)
  // .delete([tokenAuth, rolePermissions("admin")], adminDeleteAllProducts);

router.route("/uploadImage")
  .post([tokenAuth, rolePermissions("admin")], uploadImage);

router.route("/:productId")
  .get(getSingleProduct)
  .patch([tokenAuth, rolePermissions("admin")], updateProduct)
  .delete([tokenAuth, rolePermissions("admin")], deleteProduct);

router.route("/:productId/reviews").get(getSingleProductReviews);
//-----------------------------------------------------------------------

module.exports = router;
