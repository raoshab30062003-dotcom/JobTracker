const cors = require("cors");
require("dotenv").config();
const express = require("express");
const db = require("./config/db");

const applicationRoutes = require("./Routes/applicationRoutes");
const authRoutes = require("./Routes/authRoutes");
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
}));

// Routes
app.use("/api/applications", applicationRoutes);
app.use("/api/auth", authRoutes);

// Health API
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "JobTracker API is working!",
  });
});

// Database test API
app.get("/api/db-test", async (req, res) => {
  try {
    const [result] = await db.execute("SELECT 1 AS result");

    res.status(200).json({
      success: true,
      message: "MySQL connected successfully!",
      data: result,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
