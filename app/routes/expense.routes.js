// module.exports = (app) => {
const expenses = require("../controllers/expense.controller.js");
const authMiddleware = require("../middleware/auth.middleware");

var router = require("express").Router();

// Create a new Expense
router.post("/", authMiddleware, expenses.create);

// Retrieve all Expenses
router.get("/", authMiddleware, expenses.findAll);

// app.use("/api/expenses", router);

module.exports = router;
