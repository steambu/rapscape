// database.js

const sqlite3 = require("sqlite3").verbose();
const {
  createSkillsTable,
  populateSkillsTable,
} = require("./database-functions/skills");

const {
  createPlayersTable,
  populatePlayersTable,
} = require("./database-functions/player");

const {
  createActivitiesTable,
  populateActivitiesTable,
} = require("./database-functions/activities");

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database.");
});

// Create and populate skills table
createSkillsTable(db)
  .then(() => {
    return populateSkillsTable(db);
  })
  .catch((err) => {
    console.error(err.message);
  });

// Create and populate players table
createPlayersTable(db)
  .then(() => {
    return populatePlayersTable(db);
  })
  .catch((err) => {
    console.error(err.message);
  });

// Create and populate activities table
createActivitiesTable(db)
  .then(() => {
    return populateActivitiesTable(db);
  })
  .catch((err) => {
    console.error(err.message);
  });

module.exports = db;
