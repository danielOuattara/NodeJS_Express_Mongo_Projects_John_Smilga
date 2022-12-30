const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const validator = require("validator");

//----------------------------------------------------------------
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
      mesage: "Provide a valid email",
    },
    unique: [true, "Email is already taken. Please provide email"],
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

//----------------------------------------------------------------
UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths()); // --> an array of strings like: [ "name", email]
  // console.log(this.isModified("name")); //  --> boolean
  if (this.isModified("password")) {
    const salt = await bcryptjs.genSalt(11);
    this.password = await bcryptjs.hash(this.password, salt);
  } else {
    return;
  }
});

//----------------------------------------------------------------
UserSchema.methods.checkPassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

//----------------------------------------------------------------
module.exports = mongoose.model("User", UserSchema);
