const Product = require("./../models/Product");
const { StatusCodes } = require("http-status-codes");

const uploadProductImage = async (req, res, next) => {
    console.log(req)
  res.send("upload product image");
};

module.exports = { uploadProductImage };
