const express = require("express");
const router = express.Router();
const {
  getJobs,
  getJob,
  getBulkJobs,
} = require("../controllers/job.controllers");

router.get("/all-jobs", getJobs);
router.get("/bulk-jobs", getBulkJobs);
router.get("/:id", getJob);

module.exports = router;
