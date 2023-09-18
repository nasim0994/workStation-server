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
    email: {
      type: String,
      require: [true, "Email is require"],
      unique: [true, "Already use this Email, Please provide a unique Email"],
      validate: [validator.isEmail, "Please Provide Valid Email"],
      trim: true,
      lowercase: true,
    },
    contactNumber: {
      type: String,
      validate: [validator.isMobilePhone, "Please provide valid Number"],
      require: [true, "Number is require"],
    },
    password: {
      type: String,
      require: true,
    },
    // confirmPassword: {
    //   type: String,
    //   require: true,
    //   validate: {
    //     validator: function (value) {
    //       return value === this.password;
    //     },
    //     message: "Password don't match",
    //   },
    // },
    role: {
      type: String,
      default: "buyer",
      enum: ["admin", "buyer"],
    },
    imageURl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.pre("save", function (next) {
//   this.confirmPassword = undefined;
//   next();
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
