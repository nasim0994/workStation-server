const Jobs = require("../models/Jobs");

exports.getJobs = async (req, res) => {
  try {
    const { skills, jobType, city, categories } = req.query;

    let querys = {};

    if (skills && skills?.length > 2) {
      querys.skills = { $in: JSON.parse(skills) };
    }
    if (jobType) {
      querys.jobType = jobType;
    }
    if (city) {
      querys.city = city;
    }
    if (categories && categories?.length > 2) {
      querys.category = { $in: JSON.parse(categories) };
    }

    const result = await Jobs.find(querys);

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
