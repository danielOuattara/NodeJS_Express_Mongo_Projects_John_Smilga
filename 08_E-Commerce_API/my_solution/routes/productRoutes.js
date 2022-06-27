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
  userAuth,
  authorizedPermissions,
} = require("./../middleware/authentication");

//----------------------------------------------------------------------

router.route("/").post(createProduct);
router.route("/").get(getAllProducts);

router.route("/:productId/image").post(uploadImage);

router.route("/:productId").patch(updateProduct);
router.route("/:productId").get(getSingleProduct);
router.route("/:productId").delete(deleteProduct);

//-----------------------------------------------------------------------

module.exports = router;
