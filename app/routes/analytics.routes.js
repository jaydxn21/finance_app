const analyticsController = require("../controllers/analytics.controller");
const authMiddleware = require("../middleware/auth.middleware");
var router = require("express").Router();

router.get(
  "/user/:userId",
  authMiddleware,
  analyticsController.getAnalyticsData
);

module.exports = router;
