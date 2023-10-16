const Jobs = require("../models/Jobs");

exports.getJobs = async (req, res) => {
  try {
    const { jobType, locations, categories, limit, page } = req.query;

    let query = {};

    if (categories && categories?.length > 2) {
      query.category = { $in: JSON.parse(categories) };
    }

    if (jobType && jobType?.length > 2) {
      query.jobType = { $in: JSON.parse(jobType) };
    }

    if (locations && locations?.length > 2) {
      query.city = { $in: JSON.parse(locations) };
    }

    const skip = (page - 1) * parseInt(limit);

    const result = await Jobs.find(query).skip(skip).limit(parseInt(limit));

    const total = await Jobs.countDocuments(query);
    const pages = Math.ceil(parseInt(total) / parseInt(limit));

    res.status(200).json({
      status: "success",
      pages,
      total,
      jobs: result,
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
