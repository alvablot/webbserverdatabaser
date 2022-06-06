const uuid = require("uuid");
const db = require("../database.js");
let borrowers;
const fetchBooksTable = "SELECT * FROM books";
const fetchTable = "SELECT * FROM borrowers";
const deleteRow = "DELETE FROM borrowers ";
const insertRow = "INSERT INTO borrowers";
const updateRow = "UPDATE borrowers";

function initBorrowers(query) {
  db.all(query, (err, rows) => {
    borrowers = rows;
  });
  return borrowers;
}

function getAll() {
  const query = fetchTable;
  borrowers = initBorrowers(query);
  return borrowers;
}

let book;
function borrowedBooks(id) {
  db.all(`SELECT title FROM books WHERE borrower_id = ${id}`, (err, rows) => {
    book = rows;
  });
  return book;
}

function getOne(id) {
  const query = `${fetchTable} WHERE id = ${id}`;
  book = borrowedBooks(id);
  console.log(book);
  borrowers = initBorrowers(query);
  book = { borrowedBooks: book };
  borrowers.push(book);
  return borrowers;
}

function addOne(data) {
  const query = `
  ${insertRow} (id, first_name, last_name) 
  VALUES(?, ?, ?)`;
  db.run(query, [uuid.v4(), data[0].first_name, data[0].last_name]);
  borrowers = initBorrowers(fetchTable);
  return borrowers;
}

function deleteOne(id) {
  db.run(`${deleteRow} WHERE id = ?`, id, (err) => {});
  borrowers = initBorrowers(fetchTable);
  return borrowers;
}

function updateOne(id, data) {
  // PUT
  var query = `
  ${updateRow}
    SET first_name = ?, last_name = ?,   
    WHERE id=?`;
  db.run(query, [data[0].first_name, data[0].last_name, id]);
  borrowers = initBorrowers(fetchTable);
  return borrowers;
}

function patchOne(id, data) {
  function updatePart(col, data) {
    db.run(
      `${updateRow}
      SET ${col} = ?
      WHERE id = ?`,
      [data, id]
    );
  }
  if (data[0].first_name !== undefined) {
    updatePart("first_name", data[0].first_name);
  }
  if (data[0].last_name !== undefined) {
    updatePart("last_name", data[0].last_name);
  }
  borrowers = initBorrowers(fetchTable);
  return borrowers;
}

module.exports = {
  borrowers,
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
  patchOne,
};
