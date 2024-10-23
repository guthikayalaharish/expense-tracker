const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to your SQLite database file
const dbPath = path.resolve(__dirname, 'database.sqlite');

// Connect to the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening SQLite database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

module.exports = db;
