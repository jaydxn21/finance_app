const analyticsController = require("../controllers/analytics.controller");
const authMiddleware = require("../middleware/auth.middleware");
// const express = require("express");
// const router = express.Router();
// var router = require("express").Router();
var router = require("express").Router();

router.get("/", authMiddleware, analyticsController.getAnalyticsData);

module.exports = router;
