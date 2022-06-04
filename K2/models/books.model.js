const uuid = require("uuid");
const db = require("../database.js");
let books;

function initBooks(params) {
  db.all(params, (err, rows) => {
    books = rows;
  });
  return books;
}
books = initBooks("SELECT * from books");

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
  db.run(`INSERT INTO books(
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
      data[0].binding
    ]);
  books = initBooks("SELECT * from books");
  return books;
}
/*
function deleteOne(id) {
  id = parseInt(id);
  books = initBooks(`SELECT * FROM books WHERE id != ${id}`);
  return books;
}

function updateOne(id, data) {
  id = parseInt(id);
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex < 0) return 404;
  books[bookIndex] = {
    id: id,
    brand: data.brand,
    model: data.model,
    reg: data.reg,
  };
  return books;
}

function patchOne(id, data) {
  id = parseInt(id);
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex < 0) return 404;
  if (data.reg) books[bookIndex].reg = data.reg;
  if (data.brand) books[bookIndex].brand = data.brand;
  if (data.model) books[bookIndex].model = data.model;

  return books;
}
*/
module.exports = {
  books,
  getAll,
  getOne,
  addOne,
  // deleteOne,
  // updateOne,
  // patchOne,
};
