require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "https://fnce.onrender.com",
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
  res.json({ message: "Atomic Production - Where dreams ignite!" });
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

// Start listening on the port immediately
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Authenticate and sync database in the background
db.sequelize
  .authenticate()
  .then(() => {
    console.log("PostgreSQL connected successfully.");

    // Conditionally sync database based on environment
    if (process.env.NODE_ENV !== "production") {
      db.sequelize.sync({ force: true }).then(() => {
        console.log("Drop and re-sync db in development.");
      });
    } else {
      db.sequelize.sync(); // Sync without dropping tables in production
    }
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
