module.exports = (sequelize, Sequelize) => {
  const Expense = sequelize.define("expense", {
    amount: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  });

  return Expense;
};
