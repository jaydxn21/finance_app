const transactionType = require("../controllers/transactionType.controller.js");
var router = require("express").Router();

// Retrieve all Transaction Types
router.get("/", transactionType.findAll);
module.exports = router;
