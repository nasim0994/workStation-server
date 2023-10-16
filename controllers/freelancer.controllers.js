const Freelancers = require("../models/Freelancers");

exports.getFreelancers = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const skip = (page - 1) * parseInt(limit);

    const { categories } = req.query;
    let query = {};

    if (categories && categories?.length > 2) {
      query.category = { $in: JSON.parse(categories) };
    }

    const result = await Freelancers.find(query)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Freelancers.countDocuments(query);

    res.status(200).json({
      status: "success",
      total,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.getFreelancer = async (req, res) => {
  try {
    const user = await Freelancers.findOne({ email: req.user.email });

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.getFreelancerByUserName = async (req, res) => {
  try {
    const freelancer = await Freelancers.findOne({
      userName: req.params.params,
    });

    res.status(200).json({
      status: "success",
      data: freelancer,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};
