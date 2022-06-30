const express = require("express");
const router = express.Router();
const {
  tokenAuth,
  rolePermissions,
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

router.route("/")
  .get([tokenAuth, rolePermissions("admin")], getAllOrders)
  .post(tokenAuth, createOrder);

router.route("/showAllMyOrders").get(tokenAuth, getCurrentUserOrders);

router.route("/:orderId")
  .get(tokenAuth, getSingleOrder)
  .patch(tokenAuth, updateOrder)
  .delete(tokenAuth, deleteOrder);

//-----------------------------------------------------------------------

module.exports = router;
