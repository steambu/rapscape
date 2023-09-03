// Existing imports remain the same
const express = require("express");
const router = express.Router();

// Existing GET route, but with the base URL attached to the imageURL
router.get("/all", (req, res) => {
  const sql = "SELECT * FROM skills";
  req.db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    const updatedRows = rows.map((skill) => {
      skill.imageURL = `http://localhost:4000/images/${skill.imageURL}`;
      return skill;
    });
    res.json(updatedRows);
  });
});

// New PUT route to update the skill
router.put("/:id/levelUp", (req, res) => {
  const { id } = req.params;

  const calculateNextLevelXP = (currentLevel) => {
    return Math.floor(
      (currentLevel - 1 + 300 * Math.pow(2, (currentLevel - 1) / 7)) / 4
    );
  };

  // First, get the current level and XP from the database
  req.db.get(
    "SELECT currentLevel, totalXP FROM skills WHERE id = ?",
    [id],
    (err, row) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const nextLevelXP = calculateNextLevelXP(row.currentLevel + 1);

      // Then, update the level and XP
      req.db.run(
        `UPDATE skills SET currentLevel = currentLevel + 1, totalXP = totalXP + ? WHERE id = ?`,
        [nextLevelXP, id],
        function(err) {
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          res.json({ message: "Skill leveled up", changes: this.changes });
        }
      );
    }
  );
});

// Skill Route
// SELECT * FROM skills

module.exports = router;
