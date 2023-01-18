const Order = require("./../models/Order");
const Product = require("./../models/Product");
const User = require("../models/UserModel");
const CustomError = require("./../errors");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const { checkPermissions } = require("../utilities");

//------------------------------------------------------------------
const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = "some_secret";
  return { client_secret, amount, currency };
};

//------------------------------------------------------------------
const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError("Your cart items is empty");
  }
  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError(
      "Tax and shipping fee are required with exact amount",
    );
  }

  let orderItems = [];
  let subTotal = 0;

  for (const item of cartItems) {
    let productInDB = await Product.findById(item.product);
    if (!productInDB) {
      throw new CustomError.NotFoundError(
        `${item.name} not found, please chose another product`,
      );
    }
    // console.log(productInDB);

    if (productInDB.inventory < 1) {
      throw new CustomError.NotFoundError(
        `${item.name} is out of stock, please chose another product`,
      );
    }

    const { name, price, image, _id } = productInDB;
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };

    // add each valid item to orderItems[]
    orderItems = [...orderItems, singleOrderItem];

    // for each valid item increment price
    subTotal += item.amount * price;
  }

  // console.log("orderItems = ", orderItems, "\n", "subTotal = ", subTotal);

  const total = tax + shippingFee + subTotal;
  // console.log("total = ", total)

  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: "EUR",
  });

  const order = await Order.create({
    tax,
    shippingFee,
    subTotal,
    total,
    orderItems,
    user: req.user._id,
    clientSecret: paymentIntent.client_secret,
  });

  res.status(StatusCodes.CREATED).json({ order });
};

//------------------------------------------------------------------
const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  if (!orders || orders.length < 1) {
    throw new CustomError.NotFoundError("No order exists yet !");
  }

  let totalAmount = 0;
  orders.map((orderItem) => (totalAmount += orderItem.total));

  res.status(StatusCodes.OK).json({
    count: orders.length,
    totalAmount: totalAmount / 100,
    orders,
  });
};

//------------------------------------------------------------------
const getSingleOrder = async (req, res) => {
  const order = await Order.findById(req.params.orderId);
  if (order === []) {
    throw new CustomError.NotFoundError("Order not found !");
  }
  checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json({ order });
};

//------------------------------------------------------------------
const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  if (!orders) {
    throw new CustomError.NotFoundError("Customer has no order yet!");
  }
  checkPermissions(req.user, orders[0]?.user);

  let totalAmount = 0;
  orders.map((item) => (totalAmount += item.total));

  res.status(StatusCodes.OK).json({
    count: orders.length,
    totalAmount: totalAmount / 100,
    orders,
  });
};

//------------------------------------------------------------------
const updateOrder = async (req, res) => {
  const order = await Order.findById(req.params.orderId);
  if (order === []) {
    throw new CustomError.NotFoundError("Order not found !");
  }
  checkPermissions(req.user, order.user);

  order.paymentIntentId = req.body.paymentIntentId;
  order.status = "paid";
  await order.save();

  res.status(StatusCodes.OK).json({ order });
};

//------------------------------------------------------------------
const deleteOrder = async (req, res) => {
  res.send("delete order");
};

//------------------------------------------------------------------

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
