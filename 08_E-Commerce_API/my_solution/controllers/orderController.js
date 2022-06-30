const Product = require("./../models/Product");
const User = require("./../models/User");
const CustomError = require("./../errors");
const { StatusCodes } = require("http-status-codes");
const path = require("path");

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
const createOrder = async (req, res) => {
  res.send("create order");
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
