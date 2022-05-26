const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required !"],
      maxLength: 50,
      trim: true,
    },

    position: {
      type: String,
      required: [true, "Position title is required !"],
      maxLength: 100,
      trim: true,
    },

    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Job creator name is required !"],
    },
  },
  { timestamps: true }
);

// JobSchema.pre('save', async function () {

// })

// JobSchema.methods.getName = function () {
//     return this.name;
// }

module.exports = mongoose.model("Job", JobSchema);
