const mongoose = require("mongoose");
const validator = require("validator");

const clientSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "Email is require"],
      unique: [true, "Already use this Email, Please provide a unique Email"],
      validate: [validator.isEmail, "Please Provide Valid Email"],
      trim: true,
      lowercase: true,
    },
    userName: {
      type: String,
    },
    name: {
      type: String,
    },
    photoUrl: {
      type: String,
    },
    role: {
      type: String,
      default: "client",
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    totalRating: {
      type: String,
      default: "0",
    },
    averageRating: {
      type: String,
      default: "0",
    },
    freelancerFeedback: {
      type: Array,
    },
    jobs: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Clients = mongoose.model("Clients", clientSchema);

module.exports = Clients;
