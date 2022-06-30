const Product = require("./../models/Product");
const User = require("./../models/User");
const CustomError = require("./../errors");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const { checkPermissions } = require("../utilities");

//------------------------------------------------------------------
const createOrder = async (req, res) => {
  const { items, tax, shippingFee } = req.body;

  if (!items || items.length < 1) {
    throw new CustomError.BadRequestError("Your cart items is empty");
  }
  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError(
      "Tax and shipping fee are required with exact amount"
    );
  }

  let orderItems = [];
  let subTotal = 0;

  for (const item of items) {
    let productInDB = await Product.findById(item.product);
    if (!productInDB) {
      throw new CustomError.NotFoundError(
        `${item.name} not found, please chose another product`
      );
    }
    console.log(productInDB);

    if (productInDB.inventory < 1) {
      throw new CustomError.NotFoundError(
        `${item.name} is out of stock, please chose another product`
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

    // for each valid item increment
    subTotal += item.amount * price;
  }

  console.log("orderItems = ", orderItems, "\n", "subTotal = ", subTotal);

  res.send("create order");
};

//------------------------------------------------------------------
const getAllOrders = async (req, res) => {
  res.send("ger all orders");
};

//------------------------------------------------------------------
const getSingleOrder = async (req, res) => {
  res.send("get single order");
};

//------------------------------------------------------------------
const getCurrentUserOrders = async (req, res) => {
  res.send("get current user orders");
};

//------------------------------------------------------------------
const updateOrder = async (req, res) => {
  res.send("update order");
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
