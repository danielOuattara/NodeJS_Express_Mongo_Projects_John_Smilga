const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("./../controllers/productController");

const {
  adminAuth,
  tokenAuth,
  rolePermissions,
} = require("./../middleware/authentication");

//----------------------------------------------------------------------

router
  .route("/")
  .post([tokenAuth, rolePermissions("admin")], createProduct)
  .get(getAllProducts);

router
  .route("/uploadImage")
  .post([tokenAuth, rolePermissions("admin")], uploadImage);

router
  .route("/:productId")
  .get(getSingleProduct)
  .patch([tokenAuth, rolePermissions("admin")], updateProduct)
  .delete([tokenAuth, rolePermissions("admin")], deleteProduct);

//-----------------------------------------------------------------------

module.exports = router;
