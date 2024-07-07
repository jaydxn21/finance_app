const db = require("../models");
const Transaction = db.transactions;

// Create and Save a new Transaction
exports.create = async (req, res) => {
  try {
    const { amount, type, date, description, userId, categoryId } = req.body;

    const transaction = await Transaction.create({
      amount,
      type,
      date,
      description,
      userId,
      categoryId,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all Transactions for a User
exports.findAll = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.params.userId },
    });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve a single Transaction with id
exports.findOne = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found!" });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Transaction by the id in the request
exports.update = async (req, res) => {
  try {
    const [updated] = await Transaction.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated) {
      const updatedTransaction = await Transaction.findByPk(req.params.id);
      res.status(200).json(updatedTransaction);
    } else {
      res.status(404).json({ message: "Transaction not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Transaction with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const deleted = await Transaction.destroy({ where: { id: req.params.id } });

    if (deleted) {
      res.status(204).json({ message: "Transaction deleted!" });
    } else {
      res.status(404).json({ message: "Transaction not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
