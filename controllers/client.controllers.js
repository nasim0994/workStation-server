const Clients = require("../models/Clients");

exports.getClients = async (req, res) => {
  try {
    const result = await Clients.find({});

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

exports.getClient = async (req, res) => {
  try {
    const user = await Clients.findOne({ email: req.user.email });

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
