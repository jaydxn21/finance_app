module.exports = (sequelize, Sequelize) => {
  const TransactionCode = sequelize.define(
    "transactionCodes",
    {
      transactionCodeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: Sequelize.STRING,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "transactionCodes",
    }
  );

  return TransactionCode;
};
