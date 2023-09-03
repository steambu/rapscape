const sqlite3 = require("sqlite3").verbose();

// Initialize database
const db = new sqlite3.Database("./skills.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the skills database.");
});

// Create the table and insert the skills
db.run(
  `CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    currentLevel INTEGER,
    maxLevel INTEGER,
    totalXP INTEGER,
    imageURL TEXT
  );`,
  function(err) {
    // This is the callback function
    if (err) {
      return console.log(err.message);
    }

    // Define the skillsData array
    const skillsData = [
      ["Attack", 1, 120, 0],
      ["Defence", 1, 120, 0],
      ["Strength", 1, 120, 0],
      ["Constitution", 1, 120, 0],
      ["Ranged", 1, 120, 0],
      ["Prayer", 1, 120, 0],
      ["Magic", 1, 120, 0],
      ["Cooking", 1, 120, 0],
      ["Woodcutting", 1, 120, 0],
      ["Fletching", 1, 120, 0],
      ["Fishing", 1, 120, 0],
      ["Firemaking", 1, 120, 0],
      ["Crafting", 1, 120, 0],
      ["Smithing", 1, 120, 0],
      ["Mining", 1, 120, 0],
      ["Herblore", 1, 120, 0],
      ["Agility", 1, 120, 0],
      ["Thieving", 1, 120, 0],
      ["Slayer", 1, 120, 0],
      ["Farming", 1, 120, 0],
      ["Runecrafting", 1, 120, 0],
      ["Hunter", 1, 120, 0],
      ["Construction", 1, 120, 0],
      ["Summoning", 1, 120, 0],
      ["Dungeoneering", 1, 120, 0],
      ["Divination", 1, 120, 0],
      ["Invention", 1, 120, 0],
      ["Archaeology", 1, 120, 0],
      ["Necromancy", 1, 120, 0],
      ["Sailing", 1, 120, 0],
      ["Alchemy", 1, 120, 0],
      ["Musicality", 1, 120, 0],
    ];

    // Now, insert the skills
    skillsData.forEach((skill) => {
      const [name, currentLevel, maxLevel, totalXP] = skill;
      const imageURL = `icon${name}.png`; // Generate the image URL based on the skill name

      db.run(
        `INSERT OR IGNORE INTO skills (name, currentLevel, maxLevel, totalXP, imageURL) VALUES (?, ?, ?, ?, ?)`,
        [...skill, imageURL], // Include imageURL when inserting
        function(err) {
          if (err) {
            return console.error("Insert error:", err.message);
          }
          console.log(`Inserted ${name} with rowid ${this.lastID}`);
        }
      );
    });
  }
);

module.exports = db;
