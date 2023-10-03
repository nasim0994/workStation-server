const Jobs = require("../models/Jobs");

exports.getJobs = async (req, res) => {
  try {
    const result = await Jobs.find({});

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

exports.getBulkJobs = async (req, res) => {
  try {
    const result = await Jobs.find({ _id: JSON.parse(req.query.ids) });

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

exports.getMyJobs = async (req, res) => {
  try {
    const result = await Jobs.find({
      postedBy: req.user.email,
    });

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

exports.getJob = async (req, res) => {
  try {
    const result = await Jobs.findOne({ _id: req.params.id });

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
