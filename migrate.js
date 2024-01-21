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
            image TEXT,
            country TEXT
        )`);
    });

    return db;
}

function destinationExists(db, name) {
    return new Promise((resolve, reject) => {
        db.get('SELECT 1 FROM destinations WHERE name = ?', [name], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(!!row);
            }
        });
    });
}

async function insertDestinations(db, destinations) {
    const stmt = db.prepare('INSERT INTO destinations (name, description, image, country) VALUES (?, ?, ?, ?)');

    for (const destination of destinations) {
        const exists = await destinationExists(db, destination.name);

        if (!exists) {
            stmt.run(destination.name, destination.description, destination.image, destination.country);
        }
    }

    stmt.finalize();
}

function migrate() {
    const jsonFilePath = '../destinations.json';
    const destinations = readJsonFile(jsonFilePath);

    const db = createDatabase();
    insertDestinations(db, destinations)
        .then(() => {
            db.close((err) => {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log('Database connection closed.');
                }
            });
        })
        .catch((err) => {
            console.error(err.message);
        });
}

module.exports = migrate;