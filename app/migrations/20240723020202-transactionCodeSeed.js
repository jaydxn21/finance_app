"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "transactionCodes",
      [
        {
          description: "INCOME TRANSACTION",
          code: "INCOME",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: "EXPENSE TRANSACTION",
          code: "EXPENSE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("transactionCodes", null, {});
  },
};
