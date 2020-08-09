const database = require('sqlite-async');
const path = require('path');

function execute(db) {
  return db.exec(`
    CREATE TABLE IF NOT EXISTS proffys (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      avatar TEXT,
      whatsapp TEXT,
      bio TEXT
    );

    CREATE TABLE IF NOT EXISTS classes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject INTEGER,
      cost TEXT,
      proffy_id INTEGER
    );

    CREATE TABLE IF NOT EXISTS class_schedules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      weekday INTEGER,
      time_from INTEGER,
      time_to INTEGER,
      class_id INTEGER
    );
  `)
}

module.exports = database.open(path.join(__dirname, 'database.sqlite')).then(execute);
