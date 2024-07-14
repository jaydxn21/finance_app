const db = require("../models");
const Expense = db.expenses;

exports.create = (req, res) => {
  if (!req.body.amount) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const expense = {
    amount: req.body.amount,
    description: req.body.description,
    date: req.body.date,
  };

  Expense.create(expense)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Expense.",
      });
    });
};

exports.findAll = (req, res) => {
  Expense.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving expenses.",
      });
    });
};
