const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./data/books_db.db", (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }

  console.log("Ansluten till books_db");

});

module.exports = db;