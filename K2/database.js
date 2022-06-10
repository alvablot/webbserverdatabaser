const sqlite3 = require("sqlite3").verbose();
const uuid = require("uuid");
const md5 = require("md5");
const db = new sqlite3.Database("./data/books_db.db", (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }

  const usersStmt = `
  CREATE TABLE users (
    id VARCHAR (255) PRIMARY KEY UNIQUE,
    first_name VARCHAR (255),
    last_name VARCHAR (255),
    email VARCHAR (255),
    password CHAR (60) DEFAULT (666) 
  )
  `;
  db.run(usersStmt, (error) => {
      const insert =
        "INSERT INTO users (id, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)";
      db.run(insert, [
        uuid.v4(),
        "Ryan",
        "Dahl",
        "ryan@dahl.dk",
        md5("666"),
      ]);
  });

  const booksStmt = `
  CREATE TABLE books (
    id VARCHAR (255) PRIMARY KEY UNIQUE,
    title VARCHAR (255),
    author VARCHAR (255),
    isbn VARCHAR (255),
    publication_date DATE,
    binding VARCHAR (255),
    user_id VARCHAR (255) 
  )
  `;

  db.run(booksStmt, (error) => {
      const insert =
        "INSERT INTO books (id, title, author, isbn, publication_date, binding, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
      db.run(insert, [
        uuid.v4(),
        "Boktitel",
        "Författare",
        "ISBN-nummer",
        "1971-01-01",
        "Pocket",
        null,
      ]);
  });

  console.log("Ansluten till books_db");
});

module.exports = db;
