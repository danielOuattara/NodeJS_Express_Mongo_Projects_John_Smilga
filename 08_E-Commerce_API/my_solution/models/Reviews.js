const mongoose = require("mongoose");
const validator = require("validator");
const User = require("./Product");
const Product = require("./Product");

//----------------------------------------------------------------
const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide a rating"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide a title"],
      maxLength: 100,
    },
    comment: {
      type: String,
      required: [true, "Please provide a comment"],
      maxLength: [500, "Comment is max 500 characters"],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

// Only One review by user on a product
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

//----------------------------------------------------------------
module.exports = mongoose.model("Review", ReviewSchema);
