const express = require("express");
const cors = require("cors");
const skillRoutes = require("./routes/skillRoutes");
const db = require("./database"); // Step 2

// Initialize Express
const app = express();
const port = 4000;

// Enable CORS
app.use(cors());

// Assuming your backend/server.js and public/images are at the same level
app.use("/images", express.static("../public/images"));

// Attach database object to each request
app.use((req, res, next) => {
  // Step 3
  req.db = db;
  next();
});

// Define API routes
app.use("/api/skills", skillRoutes); // Step 4

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
