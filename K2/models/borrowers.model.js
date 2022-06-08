const { query } = require("express");
const uuid = require("uuid");
const db = require("../database.js");
let borrowers;
const fetchBooksTable = "SELECT * FROM books";
const fetchTable = "SELECT * FROM borrowers";
const deleteRow = "DELETE FROM borrowers";
const insertRow = "INSERT INTO borrowers";
const updateRow = "UPDATE borrowers";

function initBorrowers(query) {
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      resolve(rows);
    });
  });
}

function getBorrower(query) {
  return new Promise((resolve, reject) => {
    db.get(query, (err, rows) => {
      resolve(rows);
    });
  });
}

async function getAll() {
  const query = fetchTable;
  const result = await initBorrowers(query);
  return result;
}

async function borrowedBooks(id) {
  const query = `SELECT * FROM books WHERE borrower_id = '${id}'`;
  const result = await initBorrowers(query);
  return result;
}

async function getOne(id) {
  const query = `${fetchTable} WHERE id = '${id}'`;
  let borrower = await getBorrower(query);
  let books = await borrowedBooks(id);
  books = Object.assign(books)
  result = {
    borrower,
    books,
  };
  return result;
}

async function addOne(data) {
  const query = `
  ${insertRow} (id, first_name, last_name) 
  VALUES(?, ?, ?)`;
  db.run(query, [uuid.v4(), data.first_name, data.last_name]);
  borrowers = initBorrowers(fetchTable);
  return borrowers;
}

async function deleteOne(id) {
  db.run(`${deleteRow} WHERE id = ?`, id, (err) => {});
  borrowers = initBorrowers(fetchTable);
  return borrowers;
}

async function updateOne(id, data) {
  // PUT
  var query = `
  ${updateRow}
    SET first_name = ?, last_name = ?,   
    WHERE id=?`;
  db.run(query, [data.first_name, data.last_name, id]);
  borrowers = initBorrowers(fetchTable);
  return borrowers;
}

async function patchOne(id, data) {
  function updatePart(col, data) {
    db.run(
      `${updateRow}
      SET ${col} = ?
      WHERE id = ?`,
      [data, id]
    );
  }
  if (data.first_name !== undefined) {
    updatePart("first_name", data.first_name);
  }
  if (data.last_name !== undefined) {
    updatePart("last_name", data.last_name);
  }
  const borrowers = await initBorrowers(fetchTable);
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
