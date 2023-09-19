const mongoose = require("mongoose");
const validator = require("validator");

const freelancerSchema = mongoose.Schema(
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
      default: "freelancer",
    },
    tagline: {
      type: String,
    },
    description: {
      type: String,
    },
    location: {
      type: Object,
    },
    rating: {
      type: Object,
    },
    hourly: {
      type: String,
    },
    clientFeedback: {
      type: Array,
    },
    projects: {
      type: Object,
    },
    saveItems: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const Freelancers = mongoose.model("Freelancers", freelancerSchema);

module.exports = Freelancers;
