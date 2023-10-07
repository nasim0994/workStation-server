const Category = require("../models/Categories");

exports.getCategories = async (req, res) => {
  try {
    const result = await Category.find({});

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};
