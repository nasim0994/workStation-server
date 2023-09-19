const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    companyName: {
      type: String,
    },
    companyLogo: {
      type: String,
    },
    jobType: {
      type: String,
    },
    minimumPrice: {
      type: Number,
    },
    maximumPrice: {
      type: Number,
    },
    duration: {
      type: String,
    },
    experienceLevel: {
      type: String,
    },
    details: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    skills: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Jobs = mongoose.model("Jobs", jobSchema);

module.exports = Jobs;
