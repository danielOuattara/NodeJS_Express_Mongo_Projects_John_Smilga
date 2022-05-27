const Product = require("./../models/Product");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const CustomErrors = require("./../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

//---------------------------------------------------------
// const uploadProductImageLocally = async (req, res, next) => {
// if (!req.files) {
//   throw new CustomErrors.BadRequestError("No File Uploaded");
// }
// const productImage = req.files.image;
// if (!productImage.mimetype.startsWith("image")) {
//   throw new CustomErrors.BadRequestError("Only image can be uploaded");
// }
// if (productImage.size > process.env.IMAGE_MAX_SIZE) {
//   throw new CustomErrors.BadRequestError("Image max size is 1Mb");
// }
// const imagePath = path.join(
//   __dirname,
//   "./../public/uploads/" + `${productImage.name}`
// );
// console.log(imagePath);
// await productImage.mv(imagePath);
// res
//   .status(StatusCodes.CREATED)
//   .json({ image: { src: `/uploads/${productImage.name}` } });
// };

//-------------------------------------------------------------------
const uploadProductImage = async (req, res, next) => {
  if (!req.files) {
    throw new CustomErrors.BadRequestError("No File Uploaded");
  }

  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomErrors.BadRequestError("Only image can be uploaded");
  }
  if (productImage.size > process.env.IMAGE_MAX_SIZE) {
    throw new CustomErrors.BadRequestError("Image max size is 1Mb");
  }

  const result = await cloudinary.uploader.upload(productImage.tempFilePath, {
    use_filename: true,
    folder: "file-upload-john-smilga",
  });

  console.log("result = ", result);
  fs.unlinkSync(productImage.tempFilePath);
  res.status(StatusCodes.CREATED).json({ image: { src: result.secure_url } });
};

//----------------------------------------------------------
module.exports = { uploadProductImage };
