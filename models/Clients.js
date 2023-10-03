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
    bannerUrl: {
      type: String,
    },
    role: {
      type: String,
      default: "client",
    },
    location: {
      type: Object,
    },
    rating: {
      type: Object,
    },
    saveItems: {
      type: Object,
    },
    jobs: {
      type: Object,
    },
    freelancerFeedback: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Clients = mongoose.model("Clients", clientSchema);

module.exports = Clients;
