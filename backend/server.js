const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
require("dotenv").config(); // load .env file

const app = express();

// CORS configuration - IMPORTANT: This needs to be before other middleware
app.use(cors({
  origin: ["http://localhost:3000", "http://192.168.43.64:3000"], // Add your IP address
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

app.use("/api/auth", authRoutes);

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.log("❌ MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Auth Backend is running 🚀");
});

// Start server on port 5001 (different from Python Flask)
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Auth Server running on http://localhost:${PORT}`);
});