module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define("transactions", {
    amount: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    typeId: {
      type: Sequelize.INTEGER,
      allowNull: false,

      references: {
        model: "transactionTypes",
        key: "transactionTypeId",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
        model: "users",
        key: "id",
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
      models.transactionType.hasMany(Transaction, { foreignKey: "typeId" });
    Transaction.belongsTo(models.transactionType, {
      foreignKey: {
        name: "typeId",
        allowNull: false,
      },
    }),
      {
        tableName: "transactions",
      };
  };

  return Transaction;
};
