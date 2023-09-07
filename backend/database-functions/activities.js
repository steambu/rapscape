// id, activityName, activityDescription, activityReward, activityImageUrl;
function createActivitiesTable(db) {
  return new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS activities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        activityName TEXT UNIQUE,
        activityCount INTEGER,
        activityUnit TEXT,
        activityDescription TEXT,
        activityReward INTEGER,
        activityImageUrl TEXT
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

function populateActivitiesTable(db) {
  return new Promise((resolve, reject) => {
    const activities = [
      {
        activityName: "Reading",
        activityCount: 30,
        activityUnit: "minutes",
        activityDescription: "Read any book or article.",
        activityReward: 10,
        activityImageUrl: "iconSummoning.png",
      },
      {
        activityName: "Running",
        activityCount: 1,
        activityUnit: "km",
        activityDescription: "Run for 1km.",
        activityReward: 20,
        activityImageUrl: "iconActivityRunning.png",
      },
      {
        activityName: "Meditation",
        activityCount: 15,
        activityUnit: "minutes",
        activityDescription: "Meditate to clear your mind.",
        activityReward: 15,
        activityImageUrl: "iconActivityMeditation.png",
      },
      {
        activityName: "Cooking",
        activityCount: 1,
        activityUnit: "dish",
        activityDescription: "Cook a homemade meal.",
        activityReward: 25,
        activityImageUrl: "iconActivityCooking.png",
      },
      {
        activityName: "Cycling",
        activityCount: 5,
        activityUnit: "km",
        activityDescription: "Go for a 5km cycle.",
        activityReward: 30,
        activityImageUrl: "iconActivityCycling.png",
      },
    ];

    const promises = activities.map((activity) => {
      return new Promise((resolve, reject) => {
        db.run(
          `INSERT OR IGNORE INTO activities (activityName, activityCount, activityUnit, activityDescription, activityReward, activityImageUrl) VALUES (?, ?, ?, ?, ?, ?);`,
          [
            activity.activityName,
            activity.activityCount,
            activity.activityUnit,
            activity.activityDescription,
            activity.activityReward,
            activity.activityImageUrl,
          ],
          function(err) {
            if (err) {
              return reject(err);
            }
            resolve(this);
          }
        );
      });
    });

    Promise.all(promises)
      .then(() => resolve())
      .catch((err) => reject(err));
  });
}

module.exports = {
  createActivitiesTable,
  populateActivitiesTable,
};
