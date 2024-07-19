const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: console.log,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.transactionCode = require("./transactionCode.model.js")(
  sequelize,
  Sequelize
);
db.user = require("./user.model.js")(sequelize, Sequelize);

db.transactionType = require("./transactionType.model.js")(
  sequelize,
  Sequelize
);
db.transactions = require("./transaction.model.js")(sequelize, Sequelize);

db.connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected successfully");
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = db;
