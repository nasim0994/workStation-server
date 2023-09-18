const User = require("../models/Users");
const { createJsonWebToken } = require("../utils/jsonwebtoken");
const { sendMailByNodeMailer } = require("../utils/sendMail");
const jwt = require("jsonwebtoken");

exports.getUser = async (req, res) => {
  try {
    const result = await User.find({});

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

exports.getMe = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });

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

// -------------------New Process Create User (ref: Anisul Islam)----------------------------------

/* 
**Step:
    --(router: /process-register) Process the register.
        1. user info fetch (req.body).
        2. check existed user.
        3. store temporary (jwt)
        4. send verify link by email

    --(router: /createUser) verify & create user.
        5. check token.
        6. finally save user info in the database.
*/

exports.processRegister = async (req, res) => {
  try {
    // 1. user info fetch
    const newUser = req.body;
    // 2. check existed user.
    const isExisted = await User.exists({ email: newUser.email });

    if (isExisted) {
      return res.status(400).json({
        status: "fail",
        message: "User already exist. please login",
      });
    }

    // 3. store temporary (jwt)
    const token = createJsonWebToken(newUser, "10m");

    // 4. send verify link by email
    const mailData = {
      email: newUser.email,
      subject: "Verification Email by usnotashop",
      html: `
                <h2>Hello ${newUser.name}!</h2>
                <div>
                    <p>Please Click the link and Verify your Usnota account</p>
                    <a style="font-weight:600;color:#e11e63; text-decoration:underline" href="http://localhost:5000/api/v1/user/register/${token}" target="_blank">Click here</a>
                </div>
            `,
    };

    const info = await sendMailByNodeMailer(mailData);

    if (!info?.messageId) {
      return res.status(400).json({
        status: "fail",
        message: "Email send fail",
      });
    }

    res.status(200).json({
      status: "success",
      message: `Please go to your email ${newUser.email} and verify your Usnota account`,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) {
      return res.status(404).json({
        status: "fail",
        message: "Token not found",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (!decoded) {
        return res.status(401).json({
          status: "fail",
          message: "unable to verify user",
        });
      }

      const isExisted = await User.exists({ email: decoded.email });
      if (isExisted) {
        return res.status(400).json({
          status: "fail",
          message: "User already exist. please login",
        });
      }

      await User.create(decoded);

      res.send(`<div style="height:100vh;width:100%;display:flex;align-items: center;justify-content: center;">
      <h4>account verify successful, please login now</h4>
      </div>`);
    } catch (error) {
      res.status(400).json({
        status: "fail",
        data: error,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};
