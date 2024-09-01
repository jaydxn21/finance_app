const db = require("../models");
const Transaction = db.transactions;
const TransactionType = db.transactionType;
const TransactionCode = db.transactionCode;

exports.create = async (req, res) => {
  try {
    const { amount, typeId, date, description, userId } = req.body;

    const transaction = await Transaction.create({
      amount,
      typeId,
      date,
      description,
      userId,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.params.userId },
      order: [["id", "ASC"]],

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

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
