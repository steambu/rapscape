const sqlite3 = require("sqlite3").verbose();

// Initialize database
const db = new sqlite3.Database("./skills.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the skills database.");
});

// Define the skillsData array
const skillsData = [
  ["Attack", 1, 99, 0],
  ["Defence", 1, 99, 0],
  ["Strength", 1, 99, 0],
  ["Constitution", 10, 99, 0],
  ["Ranged", 1, 99, 0],
  ["Prayer", 1, 99, 0],
  ["Magic", 1, 99, 0],
];

// Create the table and insert the skills
db.run(
  `CREATE TABLE IF NOT EXISTS skills (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE,
  currentLevel INTEGER,
  maxLevel INTEGER,
  totalXP INTEGER
);`,
  function(err) {
    // This is the callback function
    if (err) {
      return console.log(err.message);
    }

    // Now, insert the skills
    skillsData.forEach((skill) => {
      db.run(
        `INSERT OR IGNORE INTO skills (name, currentLevel, maxLevel, totalXP) VALUES (?, ?, ?, ?)`,
        skill,
        function(err) {
          if (err) {
            return console.error("Insert error:", err.message);
          }
          console.log(`Inserted ${skill[0]} with rowid ${this.lastID}`);
        }
      );
    });
  }
);

module.exports = db;
