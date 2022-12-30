const express = require("express");
const router = express.Router();
const {
  tokenAuthentication,
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

router
  .route("/")
  .get([tokenAuthentication, rolePermissions("admin")], getAllOrders)
  .post(tokenAuthentication, createOrder);

router.route("/showAllMyOrders").get(tokenAuthentication, getCurrentUserOrders);

router
  .route("/:orderId")
  .get(tokenAuthentication, getSingleOrder)
  .patch(tokenAuthentication, updateOrder)
  .delete(tokenAuthentication, deleteOrder);

//-----------------------------------------------------------------------

module.exports = router;
