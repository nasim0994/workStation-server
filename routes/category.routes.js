const express = require("express");
const { getCategories } = require("../controllers/category.controllers");
const router = express.Router();

router.get("/all", getCategories);

module.exports = router;
