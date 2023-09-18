const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please provide your Full Name"],
      trim: true,
      maxLength: [50, "Name is too large"],
    },
    photoUrl: {
      type: String,
    },
    userName: {
      type: String,
      require: [true, "Please provide your userName"],
      trim: true,
      maxLength: [20, "userName is too large"],
    },
    role: {
      type: String,
      default: "freelancer",
      enum: ["freelancer", "client", "admin"],
    },
    email: {
      type: String,
      require: [true, "Email is require"],
      unique: [true, "Already use this Email, Please provide a unique Email"],
      validate: [validator.isEmail, "Please Provide Valid Email"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
