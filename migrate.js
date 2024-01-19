const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

function readJsonFile(filePath) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

function createDatabase() {
    const db = new sqlite3.Database('mydatabase.db');

    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS destinations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            description TEXT,
            image TEXT
        )`);
    });

    return db;
}

function insertDestinations(db, destinations) {
    const stmt = db.prepare('INSERT INTO destinations (name, description, image) VALUES (?, ?, ?)');

    destinations.forEach(destination => {
        stmt.run(destination.name, destination.description, destination.image);
    });

    stmt.finalize();
}

function migrate() {
    const jsonFilePath = '../destinations.json';
    const destinations = readJsonFile(jsonFilePath);

    const db = createDatabase();
    insertDestinations(db, destinations);

    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Database connection closed.');
    });
}

module.exports = migrate;