const transactionType = require("../controllers/transactionType.controller.js");
var router = require("express").Router();

router.get("/", transactionType.findAll);
module.exports = router;
