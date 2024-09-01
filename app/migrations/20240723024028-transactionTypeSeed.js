"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "transactionTypes",
      [
        {
          description: "Salary",
          codeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: "Deposit",
          codeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: "Other Income",
          codeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: "Groceries",
          codeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: "Bills",
          codeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: "Transportation",
          codeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: "Other Expense",
          codeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("transactionTypes", null, {});
  },
};
