const uuid = require("uuid");
const db = require("../database.js");
let books;

function initBooks(params) {
  db.all(params, (err, rows) => {
    books = rows;
  });
  return books;
}
//books = initBooks("SELECT * from books");

function getAll() {
  books = initBooks("SELECT * from books");
  return books;
}

function getOne(id) {
  id = parseInt(id);
  books = initBooks(`SELECT * FROM books WHERE id = ${id}`);
  return books;
}

function addOne(data) {
  db.run(
    `INSERT INTO books(
    id, 
    title, 
    author, 
    isbn, 
    publication_date,
    binding
    ) 
    VALUES(?, ?, ?, ?, ?, ?)`,
    [
      uuid.v4(),
      data[0].title,
      data[0].author,
      data[0].isbn,
      data[0].publication_date,
      data[0].binding,
    ]
  );
  books = initBooks("SELECT * from books");
  return books;
}

function deleteOne(id) {
  db.run(`DELETE FROM books WHERE id=?`, id, (err) => {
    console.log(id);
  });
  books = initBooks("SELECT * from books");
  return books;
}

let column;
let insert;
function updateOne(id, data) {
  if (data[0].title !== undefined) {
    column = "title";
    insert = data[0].title;
  }
  if (data[0].author !== undefined) {
    column = "author";
    insert = data[0].author;
  }
  if (data[0].isbn !== undefined) {
    column = "isbn";
    insert = data[0].isbn;
  }
  if (data[0].publication_date !== undefined) {
    column = "publication_date";
    insert = data[0].publication_date;
  }
  if (data[0].binding !== undefined) {
    column = "binding";
    insert = data[0].binding;
  }
  if (data[0].borrower_id !== undefined) {
    column = "borrower_id";
    insert = data[0].borrower_id;
  }
  db.run(
    `UPDATE books
    SET ${column} = ?
    WHERE id = ?`,
    [insert, id]
  );
  books = initBooks("SELECT * from books");
  return books;
}

function patchOne(id, data) {
  if (data[0].title !== undefined) {
    column = "title";
    insert = data[0].title;
  }
  if (data[0].author !== undefined) {
    column = "author";
    insert = data[0].author;
  }
  if (data[0].isbn !== undefined) {
    column = "isbn";
    insert = data[0].isbn;
  }
  if (data[0].publication_date !== undefined) {
    column = "publication_date";
    insert = data[0].publication_date;
  }
  if (data[0].binding !== undefined) {
    column = "binding";
    insert = data[0].binding;
  }
  if (data[0].borrower_id !== undefined) {
    column = "borrower_id";
    insert = data[0].borrower_id;
  }
  db.run(
    `UPDATE books
    SET ${column} = ?
    WHERE id = ?`,
    [insert, id]
  );
  books = initBooks("SELECT * from books");
  return books;
}

module.exports = {
  books,
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
  patchOne,
};
