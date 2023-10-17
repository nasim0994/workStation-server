const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  getFreelancers,
  getFreelancer,
  getFreelancerByUserName,
  getExpertFreelancers,
} = require("../controllers/freelancer.controllers");

router.get("/all-freelancers", getFreelancers);
router.get("/expert", getExpertFreelancers);
router.get("/me", verifyToken, getFreelancer);
router.get("/:params", getFreelancerByUserName);

module.exports = router;
