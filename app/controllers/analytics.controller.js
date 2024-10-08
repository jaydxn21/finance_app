const { all } = require("axios");
const db = require("../models");
const Transaction = db.transactions;
const TransactionType = db.transactionType;
const TransactionCode = db.transactionCode;

exports.getAnalyticsData = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.params.userId },

      include: [
        {
          model: TransactionType,
          as: "transactionType",
          include: [
            {
              model: TransactionCode,
              as: "transactionCode",
            },
          ],
        },
      ],
    });

    const totalIncome = transactions.reduce((acc, transaction) => {
      if (
        transaction.transactionType.transactionCode.code.toLowerCase() ===
        "income"
      ) {
        console.log(transaction.amount);
        return acc + (transaction.amount > 0 ? transaction.amount : 0);
      }
      return acc;
    }, 0);
    const totalExpenses = transactions.reduce((acc, transaction) => {
      if (
        transaction.transactionType.transactionCode.code.toLowerCase() ===
        "expense"
      ) {
        return acc + (transaction.amount > 0 ? transaction.amount : 0);
      }
      return acc;
    }, 0);

    const types = transactions.reduce((acc, transaction) => {
      const type = transaction.transactionType.description || "Others";
      if (!acc[type]) {
        acc[type] = 0;
      }
      acc[type] += transaction.amount;
      return acc;
    }, {});

    const analyticsData = {
      totalIncome,
      totalExpenses,
      types: Object.keys(types).map((type) => ({
        type,
        amount: types[type],
      })),
    };

    res.json(analyticsData);
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    res.status(500).json({ error: "Failed to fetch analytics data" });
  }
};
