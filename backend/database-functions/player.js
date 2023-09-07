function createPlayersTable(db) {
  return new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS players (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE,
        rap_amount INTEGER,
        account_level INTEGER
      );`,
      function(err) {
        if (err) {
          return reject(err);
        }
        resolve(this);
      }
    );
  });
}

function populatePlayersTable(db) {
  return new Promise((resolve, reject) => {
    // Define initial values for the player
    const name = "JohnDoe";
    const rap_amount = 1000;
    const account_level = 1;

    // SQL query to insert the player into the database
    db.run(
      `INSERT OR IGNORE INTO players (name, rap_amount, account_level) VALUES (?, ?, ?)`,
      [name, rap_amount, account_level],
      function(err) {
        if (err) {
          return reject(err);
        }
        resolve(this);
      }
    );
  });
}

module.exports = {
  createPlayersTable,
  populatePlayersTable,
};
