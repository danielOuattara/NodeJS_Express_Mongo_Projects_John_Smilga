const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require("../utilities");

//---------------------------------------------------------------------
const createReview = async (req, res) => {
  res.send("create review");
};
//---------------------------------------------------------------------
const getAllReviews = async (req, res) => {
  res.send("get all reviews");
};
//---------------------------------------------------------------------
const getSingleReview = async (req, res) => {
  res.send("getSingle review");
};
//---------------------------------------------------------------------
const updateReview = async (req, res) => {
  res.send("update review");
};
//---------------------------------------------------------------------
const deleteReview = async (req, res) => {
  res.send("delete review");
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
