module.exports = {
  HOST: process.env.PGHOST,
  USER: process.env.PGUSER,
  PASSWORD: process.env.PGPASSWORD,
  DB: process.env.PGDATABASE,
  PORT: process.env.PGPORT || 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
