const morgan = require("morgan");
const express = require("express");
const app = express();
const port = 4000;
const fetchTable = "SELECT * from books";
const insertRow = "INSERT INTO books";
let books;
app.use(express.json());

app.get("/books", (req, res) => {
  function initBooks(query) {
    const sqlite3 = require("sqlite3").verbose();
    const db = new sqlite3.Database("./data/books_db.db", (error) => {
      if (error) {
        console.error(error.message);
        throw error;
      }
      db.all(fetchTable, (err, rows) => {
        console.log(rows);
        books = rows;
      });
      console.log(books);
      console.log("Ansluten till books_db");
      return books;
    });
  }
  let result = initBooks(fetchTable);
  res.send(books);
});

app.post("/books", (req, res) => {
  function initBooks(query) {
    const sqlite3 = require("sqlite3").verbose();
    const db = new sqlite3.Database("./data/books_db.db", (error) => {
      if (error) {
        console.error(error.message);
        throw error;
      }
      db.all(fetchTable, (err, rows) => {
        console.log(rows);
        books = rows;
      });
      query = `${insertRow} (id, title, author, isbn, publication_date, binding) 
        VALUES(?, ?, ?, ?, ?, ?)`;
      db.run(query, [
        null,
        "Hej",
        "Herman Göring",
        "66666666666",
        "1987-04-30",
        "Hard",
      ]);
    });
  }
  let result = initBooks(insertRow);
  res.send(books);
});

//let result = initBooks(fetchTable);
/*
function addOne() {
  const db = new sqlite3.Database("./data/books_db.db", (error) => {
    if (error) {
      console.error(error.message);
      throw error;
    }
  });
  query = `${insertRow} (id, title, author, isbn, publication_date, binding) 
    VALUES(?, ?, ?, ?, ?, ?)`;
  db.run(query, [
    null,
    "Bokjävel",
    "Herman Göring",
    "66666666666",
    "1987-04-30",
    "Hard",
  ]);
}

addOne();
*/
//console.log(initBooks(fetchTable));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
