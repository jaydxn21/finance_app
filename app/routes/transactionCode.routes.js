const transactionCode = require("../controllers/transactionCode.controller.js");
var router = require("express").Router();

// Retrieve all Transaction Codes
router.get("/", transactionCode.findAll);
module.exports = router;
