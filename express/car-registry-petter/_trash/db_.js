const fs = require("fs");

// Initialiserar en sqlite3-databas

const dbFile = "./data/cars_proj.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);

module.exports = {
  db,
};
