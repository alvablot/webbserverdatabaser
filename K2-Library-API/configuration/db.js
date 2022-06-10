const sqlite3 = require("sqlite3").verbose();

// Skapar en ny instans av sqlite3-databasen.
const db = new sqlite3.Database("./data/db.sqlite", (error) => {
  if (error) {
    // Felmeddelande om det inte går att öppna databasen.
    console.error(error.message);
    throw error;
  }
  console.log("Du är ansluten till databasen.");

  // Använda sig av SQL för att skapa tabell för "books".
  // "books" ska ha ett 'id', 'titel', 'författare' och 'genre'.
  const booksStatement = `
    CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    genre TEXT)`;

  db.run(booksStatement, (error) => {
    const insert = `INSERT INTO books (title, author, genre) VALUES (?, ?, ?)`;
    db.run(insert, ["The Hobbit", "J. J. R. Tolkien", "Fantasy"]);
  });

  // Får ett meddelande om böckerna är skapade.
  console.log("Books table created.");
});

// Exportera modulen.
module.exports = db;
