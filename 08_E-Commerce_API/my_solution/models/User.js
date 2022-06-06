const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required !"],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "Email is required !"],
    validate: {
      validator: validator.isEmail,
      mesage: "Provide a valide email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required !"],
    minlength: 6,
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcryptjs.genSalt(11);
  this.password = await bcryptjs.hash(this.password, salt);
});

// UserSchema.methods.getName = function () {
//   return this.name;
// };

UserSchema.methods.comparePassword = function (password) {
  const isMatched = bcryptjs.compare(password, this.password);
  return isMatched;
};

module.exports = mongoose.model("User", UserSchema);
