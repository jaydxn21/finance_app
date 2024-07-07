module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define("transaction", {
    amount: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
  });

  Transaction.associate = function (models) {
    Transaction.belongsTo(models.user, {
      foreignKey: {
        allowNull: false,
      },
    });
    Transaction.belongsTo(models.category, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Transaction;
};
