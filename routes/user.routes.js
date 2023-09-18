const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  getUser,
  getMe,
  processRegister,
  registerUser,
} = require("../controllers/user.controllers");

router.post("/process-register", processRegister); // signup process
router.get("/register/:token", registerUser); //verify and user info save database

router.get("/me", verifyToken, getMe);
router.get("/all-users", getUser);

module.exports = router;
