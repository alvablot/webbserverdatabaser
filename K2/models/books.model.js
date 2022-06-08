const uuid = require("uuid");
const db = require("../database.js");
let books;
const fetchTable = "SELECT * FROM books";
const deleteRow = "DELETE FROM books ";
const insertRow = "INSERT INTO books";
const updateRow = "UPDATE books";

function initBooks(query) {
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      resolve(rows);
    });
  });
}
async function getAll() {
  const query = fetchTable;
  const result = await initBooks(query);
  //console.log(result)
  return result;
}

async function getOne(id) {
  const query = `${fetchTable} WHERE id = '${id}'`;
  const result  = await initBooks(query);
  return result;
}

async function addOne(data) {
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
  const result = await initBooks(fetchTable);
  return result;
}

async function deleteOne(id) {
  db.run(`${deleteRow} WHERE id = ?`, id, (err) => {});
  const result  = await initBooks(fetchTable);
  return books;
}

let column;
let insert;
async function updateOne(id, data) {
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
  const result  = await initBooks(fetchTable);
  return result;
}

async function patchOne(id, data) {
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

  const result  = initBooks(fetchTable);
  return result;
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
