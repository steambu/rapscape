// Imports
const express = require("express");
const cors = require("cors");
const db = require("./database");

// Import API routes
const skillRoutes = require("./routes/skillRoutes");
const playerRoutes = require("./routes/playerRoutes");
const activityRoutes = require("./routes/activityRoutes");

// Initialize Express
const app = express();
const port = 4000;

// Enable CORS
app.use(cors());

// Enable JSON request body parsing
app.use(express.json());

// Assuming your backend/server.js and public/images are at the same level
app.use("/images", express.static("../public/images"));

// Attach database object to each request
app.use((req, res, next) => {
  // Step 3
  req.db = db;
  next();
});

// Define API routes
app.use("/api/skills", skillRoutes);
app.use("/api/player", playerRoutes);
app.use("/api/activities", activityRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
