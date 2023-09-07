const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const sql = "SELECT * FROM players WHERE id = 1"; // Assuming single-player with id = 1
  req.db.get(sql, [], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(row);
  });
});

// Route for getting the player's RAP amount
router.get("/rapAmount", (req, res) => {
  const sql = "SELECT rap_amount FROM players WHERE id = 1"; // Assuming single-player with id = 1
  req.db.get(sql, [], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(row);
  });
});

// New PUT route for updating RAP
router.put("/updateRapAmount", (req, res) => {
  const newRapAmount = req.body.updatedRAP; // Data received from the frontend

  if (typeof newRapAmount !== "number") {
    return res.status(400).json({ error: "Invalid RAP amount" });
  }

  const sql = "UPDATE players SET rap_amount = ? WHERE id = 1"; // Assuming player with id = 1

  // Execute SQL query
  req.db.run(sql, [newRapAmount], function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    // Use 'this' to get information about the operation, like how many rows got affected.
    if (this.changes) {
      res.json({ changes: this.changes });
    } else {
      res.status(400).json({ error: "No changes made" });
    }
  });
});

module.exports = router;
