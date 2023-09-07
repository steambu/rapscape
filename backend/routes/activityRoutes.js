const express = require("express");
const router = express.Router();

// fetch all activities
router.get("/", (req, res) => {
  const sql = "SELECT * FROM activities";
  req.db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

// fetch a single activity by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM activities WHERE id = ?";
  req.db.get(sql, [id], (err, row) => {
    if (err) {
      throw err;
    }
    res.json(row);
  });
});

module.exports = router;
