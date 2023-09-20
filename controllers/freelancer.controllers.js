const Freelancers = require("../models/Freelancers");

exports.getFreelancers = async (req, res) => {
  try {
    const result = await Freelancers.find({});

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
