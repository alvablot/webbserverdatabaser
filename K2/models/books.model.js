const uuid = require("uuid");
const db = require("../database.js");
let books;
const fetchTable = "SELECT * from books";
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

function getOne(id) {
  const query = `${fetchTable} WHERE id = ${id}`;
  books = initBooks(query);
  return books;
}

function addOne(data) {
  const query = `
  ${insertRow} (id, title, author, isbn, publication_date, binding) 
  VALUES(?, ?, ?, ?, ?, ?)`;
  db.run(query, [
    uuid.v4(),
    data[0].title,
    data[0].author,
    data[0].isbn,
    data[0].publication_date,
    data[0].binding,
  ]);
  books = initBooks(fetchTable);
  return books;
}

function deleteOne(id) {
  db.run(`${deleteRow} WHERE id = ?`, id, (err) => {
    //console.log(id);
  });
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
    data[0].title,
    data[0].author,
    data[0].isbn,
    data[0].publication_date,
    data[0].binding,
    data[0].borrower_id,
    id,
  ]);
  books = initBooks(fetchTable);
  return books;
}

function patchOne(id, data) {
  // PATCH
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
