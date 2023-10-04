const User = require("../models/Users");
const { createJsonWebToken } = require("../utils/jsonwebtoken");

exports.loginUser = async (req, res) => {
  try {
    /*
            Login Step:
            1. check email & password are given
            2. Load user By Email
            3. match password
            4. check status active or not
            5. generate token
            6. send user & token
        */

    const { email, password } = req.body;

    // 2. Load User
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "User not found",
      });
    }

    // 3. Match Password
    if (password !== user.password) {
      return res.status(401).json({
        status: "fail",
        message: "Email or Password not match",
      });
    }

    // 5. generate token
    const accessToken = createJsonWebToken({ email, password }, "7d");

    res.status(200).json({
      status: "success",
      message: "Login Success",
      data: {
        token: accessToken,
        user: user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};
