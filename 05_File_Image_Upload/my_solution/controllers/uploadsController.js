const Product = require("./../models/Product");
const { StatusCodes } = require("http-status-codes");
const path = require("path");

//---------------------------------------------------------
const uploadProductImage = async (req, res, next) => {
  const productImage = req.files.image;
  const imagePath = path.join(
    __dirname,
    "./../public/uploads/" + `${productImage.name}`
  );

  console.log(imagePath);
  await productImage.mv(imagePath);
  res
    .status(StatusCodes.CREATED)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

//----------------------------------------------------------
module.exports = { uploadProductImage };
