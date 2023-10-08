const Jobs = require("../models/Jobs");

exports.getJobs = async (req, res) => {
  try {
    const { skills, jobType, locations, categories } = req.query;

    let querys = {};

    if (categories && categories?.length > 2) {
      querys.category = { $in: JSON.parse(categories) };
    }

    if (jobType && jobType?.length > 2) {
      querys.jobType = { $in: JSON.parse(jobType) };
    }

    if (skills && skills?.length > 2) {
      querys.skills = { $in: JSON.parse(skills) };
    }

    if (locations && locations?.length > 2) {
      querys.city = { $in: JSON.parse(locations) };
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
