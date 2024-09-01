const transactions = require("../controllers/transaction.controller.js");
const authMiddleware = require("../middleware/auth.middleware");

var router = require("express").Router();

router.post("/", authMiddleware, transactions.create);

router.get("/user/:userId", authMiddleware, transactions.findAll);

router.get("/:id", authMiddleware, transactions.findOne);

router.put("/:id", authMiddleware, transactions.update);

router.delete("/:id", authMiddleware, transactions.delete);

module.exports = router;
