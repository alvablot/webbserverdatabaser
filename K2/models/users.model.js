const uuid = require("uuid");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const db = require("../database.js");
let users;
const fetchBooksTable = "SELECT * FROM books";
const fetchTable = "SELECT * FROM users";
const deleteRow = "DELETE FROM users";
const insertRow = "INSERT INTO users";
const updateRow = "UPDATE users";

function initUsers(query) {
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      resolve(rows);
    });
  });
}

function getUser(query) {
  return new Promise((resolve, reject) => {
    db.get(query, (err, rows) => {
      resolve(rows);
    });
  });
}

async function getAll() {
  const query = fetchTable;
  const result = await initUsers(query);
  return result;
}

async function borrowedBooks(id) {
  const query = `SELECT * FROM books WHERE user_id = '${id}'`;
  const result = await initUsers(query);
  return result;
}

async function getOne(id) {
  const query = `${fetchTable} WHERE id = '${id}'`;
  let user = await getUser(query);
  let books = await borrowedBooks(id);
  books = Object.assign(books);
  const result = {
    user,
    books,
  };
  return result;
}

async function addOne(data) {
  const { first_name, last_name, email, password } = data;
  if (!first_name || !last_name || !email || !password) return 400;
  const existingUser = await getUser(
    `SELECT * FROM users WHERE email = '${email}'`
  );
  if (existingUser !== undefined) {
    if (email === existingUser.email) return 409;
  }
  const query = `${insertRow} (id, first_name, last_name, email, password)  VALUES(?, ?, ?, ?, ?)`;
  db.run(query, [uuid.v4(), first_name, last_name, email, md5(password)]);
  users = initUsers(fetchTable);
  return users;
}

async function login(id, data) {
  const { email, password } = data;
  if (!email || !password) return 400;

  const existingUser = await getUser(
    `SELECT * FROM users WHERE email = '${email}'`
  );
  if (existingUser === undefined) return 404;
  const hashedPassword = md5(password);
  const checkPassword = await getUser(
    `SELECT * FROM users WHERE password = '${hashedPassword}'`
  );
  if (checkPassword === undefined) return 404;

  console.log("Right password");

  const token = jwt.sign(
    {
      id: existingUser.id,
      //username: existingUser.username,
      email: existingUser.email,
    },
    process.env.SECRET_KEY
  );
  return token;
}

async function deleteOne(id) {
  db.run(`${deleteRow} WHERE id = ?`, id, (err) => {});
  users = initUsers(fetchTable);
  return users;
}

async function updateOne(id, data) {
  const query = `SELECT * FROM users SET first_name WHERE id = 3`;
  db.run(query, ["Olle"]);
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
  const users = await initUsers(fetchTable);
  return users;
}

module.exports = {
  users,
  getAll,
  getOne,
  addOne,
  login,
  deleteOne,
  updateOne,
  patchOne,
};
