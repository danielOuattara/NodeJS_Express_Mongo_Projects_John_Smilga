const mongoose = require("mongoose");

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
      trim: true,
      required: [true, "Please provide a comment"],
      maxLength: [500, "Comment is max 500 characters"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

//----------------------------------------------------------------
// Only One review by user on a product
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

//----------------------------------------------------------------
// Create a static method
ReviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        numberOfReviews: { $sum: 1 },
      },
    },
  ]);
  console.log("result = ", result);

  try {
    await this.model("Product").findOneAndUpdate(
      { _id: productId },
      {
        averageRating: result[0]?.averageRating.toFixed(1) || 0,
        numberOfReviews: result[0]?.numberOfReviews || 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//----------------------------------------------------------------
ReviewSchema.post("save", async function () {
  // call static method
  await this.constructor.calculateAverageRating(this.product);
});

//----------------------------------------------------------------
ReviewSchema.post("remove", async function () {
  // call static method
  await this.constructor.calculateAverageRating(this.product);
});

//----------------------------------------------------------------
module.exports = mongoose.model("Review", ReviewSchema);
