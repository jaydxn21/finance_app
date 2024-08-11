require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

const authMiddleware = require("./middleware/auth.middleware");
const db = require("./models");

const authRoutes = require("./routes/auth.routes");
const transactionRoutes = require("./routes/transaction.routes");
const transactionTypeRoutes = require("./routes/transactionType.routes");
const analyticsRoutes = require("./routes/analytics.routes");

// db.sequelize.sync();

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Atomic Production - Whwere dreams ignite!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/transactionType", transactionTypeRoutes);
app.use("/api/analytics", analyticsRoutes);

// app.get("/api/analytics", analyticsRoutes);
// app.get("/api/analytics", (req, res) => {
//   const analyticsData = {
//     totalSpent: 76550.9,
//     totalIncome: 5250.44,
//     totalExpenses: 3120.75,
//     categories: [
//       { category: "Groceries", amount: 2500 },
//       { category: "Bills", amount: 1500 },
//       { category: "Transportation", amount: 500 },
//       { category: "Income", amount: 1000 },
//       { category: "Deposit", amount: 750 },
//     ],
//   };
//   res.json(analyticsData);
// });

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route!!" });
});

// Test connection route
app.get("/test-connection", async (req, res) => {
  try {
    await db.sequelize.authenticate();
    res.status(200).json({
      message: "Connection to the database has been established successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to connect to the database.",
      error: error.message,
    });
  }
});

// Connect to the database and start the server
db.sequelize
  .authenticate()
  .then(() => {
    console.log("PostgreSQL connected successfully.");
    // Sync database
    // db.sequelize.sync();
    db.sequelize.sync().then(() => {
      console.log("Drop and re-sync db.");
    });
    // Set port, listen for requests
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

// set port, listen for requests
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });
