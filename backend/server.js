const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const db = require("./database");

// Import Routes
const skillRoutes = require("./routes/skillRoutes");

// Middleware to make db available in request
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Enable CORS for all routes
app.use(cors());

// Use the skillRoutes module for any routes starting with /api/skills
app.use("/api/skills", skillRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
