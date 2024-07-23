const db = require("../models");
const TransactionCode = db.transactionCode;

// Retrieve all Transaction Codes
exports.findAll = async (req, res) => {
  try {
    const transactionCode = await TransactionCode.findAll({});

    res.status(200).json(transactionCode);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
