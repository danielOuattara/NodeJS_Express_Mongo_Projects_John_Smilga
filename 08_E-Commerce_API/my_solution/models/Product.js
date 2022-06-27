const mongoose = require("mongoose");
const validator = require("validator");

//----------------------------------------------------------------
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required !"],
      trim: true,
      minLength: 3,
      maxLength: [100, "Product name, max 100 characters"],
    },
    price: {
      type: Number,
      maxLength: 50,
      required: [true, "Price value is required !"],
    },
    description: {
      type: String,
      required: [true, "Product description is required !"],
      maxLength: [1000, "Product description, is max 1000 characters"],
    },
    image: {
      type: String,
      default: "/uploads/example.jpeg",
      required: [true, "Product image is required !"],
    },
    category: {
      type: String,
      required: [true, "Product category is required !"],
      enum: ["office", "kitchen", "bedroom"],
    },
    company: {
      type: String,
      required: [true, "Product category is required !"],
      enum: {
        values: ["ikea", "liddy", "marcos"],
        message: "{VALUE} is not suported",
      },
    },
    colors: {
      type: [String],
      required: [true, "Product color is required !"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: [true, "Inventory data is required !"],
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

//----------------------------------------------------------------
module.exports = mongoose.model("Product", ProductSchema);
