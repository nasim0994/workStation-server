const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  getFreelancers,
  getMe,
} = require("../controllers/freelancer.controllers");

router.get("/all-freelancers", getFreelancers);
router.get("/me", verifyToken, getMe);

module.exports = router;
