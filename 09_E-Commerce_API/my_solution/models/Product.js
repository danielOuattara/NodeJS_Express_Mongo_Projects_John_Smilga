const mongoose = require("mongoose");
const validator = require("validator");
const Review = require("./Reviews");

//----------------------------------------------------------------
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required !"],
      trim: true,
      minLength: 2,
      maxLength: [100, "Product name, max 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price value is required !"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Product description is required !"],
      maxLength: [1000, "Product description, is max 1,000 characters"],
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
      required: [true, "Company is required !"],
      enum: {
        values: ["ikea", "liddy", "marcos"],
        message: "{VALUE} is not supported as company name",
      },
    },
    colors: {
      type: [String],
      default: ["#222"],
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
    numberOfReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    // 1 : set properties to accept virtuals,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

//--------------------------------------------------------
// 2 : define links parameters
ProductSchema.virtual("reviews", {
  ref: "Review", // ref to the Model name
  localField: "_id", // a connection btw. the two models
  foreignField: "product", // the field in the ref above
  justOne: false, // to get a list
  // match: { rating: 2 }, // match docs where rating = 5
  // match: { rating: 5 }, // match docs where rating = 5
});

//--------------------------------------------------------
ProductSchema.pre("remove", async function (next) {
  await this.model("Review").deleteMany({ product: this._id });
});

//----------------------------------------------------------------
module.exports = mongoose.model("Product", ProductSchema);
