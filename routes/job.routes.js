const express = require("express");
const router = express.Router();
const { getJobs, getJob } = require("../controllers/job.controllers");

router.get("/all-jobs", getJobs);
router.get("/:id", getJob);

module.exports = router;