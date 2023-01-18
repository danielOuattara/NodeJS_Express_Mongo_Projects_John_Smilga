const express = require("express");
const router = express.Router();
const {
  tokenAuthentication: tokenAuth,
  rolePermissions: roles,
} = require("./../middleware/authentication");
const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("./../controllers/orderController");

//----------------------------------------------------------------------

router
  .route("/")
  .post(tokenAuth, createOrder)
  .get([tokenAuth, roles("admin")], getAllOrders);

router.route("/showAllMyOrders").get(tokenAuth, getCurrentUserOrders);

router
  .route("/:orderId")
  .get(tokenAuth, getSingleOrder)
  .patch(tokenAuth, updateOrder)
  .delete(tokenAuth, deleteOrder);

//-----------------------------------------------------------------------

module.exports = router;
