const { transactionType } = require(".");

module.exports = (sequelize, Sequelize) => {
  const TransactionType = sequelize.define(
    "transactionTypes",
    {
      transactionTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: Sequelize.STRING,
      },
      codeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "transactionCodes",
          key: "transactionCodeId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "transactionTypes",
    }
  );

  TransactionType.associate = function (models) {
    models.transactionCode.hasMany(TransactionType, {
      foreignKey: "codeId",
    });
    TransactionType.belongsTo(models.transactionCode, {
      foreignKey: {
        name: "codeId",
        allowNull: false,
      },
    }),
      {
        tableName: "transactionType",
      };
  };

  return TransactionType;
};
