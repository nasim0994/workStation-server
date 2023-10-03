const express = require("express");
const router = express.Router();
const {
  getJobs,
  getJob,
  getBulkJobs,
  getMyJobs,
} = require("../controllers/job.controllers");
const verifyToken = require("../middleware/verifyToken");

router.get("/all-jobs", getJobs);
router.get("/bulk-jobs", getBulkJobs);
router.get("/my-jobs", verifyToken, getMyJobs);
router.get("/:id", getJob);

module.exports = router;
