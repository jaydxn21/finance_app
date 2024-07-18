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
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Name of the table
        key: "id", // Key in Users table that the userId column will refer to
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  });

  Transaction.associate = function (models) {
    models.user.hasMany(Transaction, { foreignKey: "userId" });
    Transaction.belongsTo(models.user, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    }),
      {
        tableName: "transactions",
      };
  };

  return Transaction;
};
