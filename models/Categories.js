const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: [50, "Name is too large"],
  },
  icon: {
    type: String,
  },
  totalJobs: {
    type: Number,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
