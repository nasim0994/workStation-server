const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

const { getClients, getClient } = require("../controllers/client.controllers");

router.get("/all-clients", getClients);
router.get("/me", verifyToken, getClient);

module.exports = router;
