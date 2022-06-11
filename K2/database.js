const sqlite3 = require("sqlite3").verbose();
const uuid = require("uuid");
const md5 = require("md5");
const db = new sqlite3.Database("./data/books_db.db", (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }
  function initTable(query) {
    const exist = new Promise((resolve, reject) => {
      db.get(`SELECT * FROM users`, (err, rows) => {
        resolve(rows);
        console.log(`${exist.json()}`);
      });
    });
    return new Promise((resolve, reject) => {
      db.run(query, (err, rows) => {
        resolve(rows);
        console.log(`WOW! I JUST DID ${query.substring(0, 18)}`);
      });
    });
  }
  const createUsersTable = `CREATE TABLE users (
    id VARCHAR (255) PRIMARY KEY UNIQUE,
    first_name VARCHAR (255),
    last_name VARCHAR (255),
    email VARCHAR (255) UNIQUE,
    password CHAR (60) DEFAULT (666) 
  )
  `;
  const createBooksTable = `CREATE TABLE books (
      id VARCHAR (255) PRIMARY KEY UNIQUE,
      title VARCHAR (255),
      author VARCHAR (255),
      isbn VARCHAR (255),
      publication_date DATE,
      binding VARCHAR (255),
      user_id VARCHAR (255) 
    )
    `;

  initTable(createUsersTable);
  initTable(createBooksTable);

  console.log("Ansluten till books_db");
});

module.exports = db;
