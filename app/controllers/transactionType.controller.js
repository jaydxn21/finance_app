const db = require("../models");
const TransactionType = db.transactionType;

// Retrieve all Transaction Type
exports.findAll = async (req, res) => {
  try {
    const transactionType = await TransactionType.findAll({});

    res.status(200).json(transactionType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
