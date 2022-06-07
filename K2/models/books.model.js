const uuid = require("uuid");
const db = require("../database.js");
let books;
const fetchTable = "SELECT * FROM books";
const deleteRow = "DELETE FROM books ";
const insertRow = "INSERT INTO books";
const updateRow = "UPDATE books";

function initBooks(query) {
  db.all(query, (err, rows) => {
    books = rows;
  });
  return books;
}

function getAll() {
  const query = fetchTable;
  const result = initBooks(query);
  return result;
}

 function getOne(id,) {
  const query = `${fetchTable} WHERE id = '${id}'`;
  const books = initBooks(query);
  //console.log(query);
  return books;
}

function addOne(data) {
  const query = `
  ${insertRow} (id, title, author, isbn, publication_date, binding) 
  VALUES(?, ?, ?, ?, ?, ?)`;
  db.run(query, [
    uuid.v4(),
    data.title,
    data.author,
    data.isbn,
    data.publication_date,
    data.binding,
  ]);
  books = initBooks(fetchTable);
  return books;
}

function deleteOne(id) {
  db.run(`${deleteRow} WHERE id = ?`, id, (err) => {});
  books = initBooks(fetchTable);
  return books;
}

let column;
let insert;
function updateOne(id, data) {
  // PUT
  var query = `${updateRow} 
    SET 
      title = ?, 
      author = ?, 
      isbn = ?, 
      publication_date = ?, 
      binding = ?,
      borrower_id = ?    
    WHERE id=?`;
  db.run(query, [
    data.title,
    data.author,
    data.isbn,
    data.publication_date,
    data.binding,
    data.borrower_id,
    id,
  ]);
  books = initBooks(fetchTable);
  return books;
}

function patchOne(id, data) {
  //.log(data.title);
  if (data.title !== undefined) {
    column = "title";
    insert = data.title;
  }
  if (data.author !== undefined) {
    column = "author";
    insert = data.author;
  }
  if (data.isbn !== undefined) {
    column = "isbn";
    insert = data.isbn;
  }
  if (data.publication_date !== undefined) {
    column = "publication_date";
    insert = data.publication_date;
  }
  if (data.binding !== undefined) {
    column = "binding";
    insert = data.binding;
  }
  if (data.borrower_id !== undefined) {
    column = "borrower_id";
    insert = data.borrower_id;
  }

  db.run(
    `${updateRow}
    SET ${column} = ?
    WHERE id = ?`,
    [insert, id]
  );

  books = initBooks(fetchTable);
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
