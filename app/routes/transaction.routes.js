// module.exports = (app) => {
const transactions = require("../controllers/transaction.controller.js");
const authMiddleware = require("../middleware/auth.middleware");

var router = require("express").Router();

// Create a new Transaction
router.post("/", authMiddleware, transactions.create);

// Retrieve all Transactions for a User
router.get("/user/:userId", authMiddleware, transactions.findAll);

// Retrieve a single Transaction with id
router.get("/:id", authMiddleware, transactions.findOne);

// Update a Transaction with id
router.put("/:id", authMiddleware, transactions.update);

// Delete a Transaction with id
router.delete("/:id", authMiddleware, transactions.delete);

// app.use("/api/transactions", router);
module.exports = router;
