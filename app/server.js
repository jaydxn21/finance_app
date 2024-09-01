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

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Atomic Production - Whwere dreams ignite!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/transactionType", transactionTypeRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route!!" });
});

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

db.sequelize
  .authenticate()
  .then(() => {
    console.log("PostgreSQL connected successfully.");

    db.sequelize.sync().then(() => {
      console.log("Drop and re-sync db.");
    });

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
