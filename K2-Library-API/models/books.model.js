const db = require("../configuration/db");
// Hämta från express biblotek.
const res = require("express/lib/response");

/**
 * Lägg till GET /books, GET /books/:id, POST /books, PUT /books/id, PATCH /books/:id & DELETE /books/:id
 * Använd sig av SQL för att få fram böckerna med alla funktionerna.
 *
 * SELECT -- Used to select data from a database, which is then returned in a results set.
 * FROM -- Specifies which table to select or delete data from.
 * WHERE -- Updates existing data in a table.
 * INSERT INTO -- Adds new rows to a table.
 * VALUES -- Used alongside the INSERT INTO keyword to add new values to a table.
 * UPDATE -- Updates existing data in a table.
 * DELETE -- Delete data from a table.
 */
function initBooks(sql) {
  return new Promise((resolve, reject) => {
    db.all(sql, (error, rows) => {
      resolve(rows);
    });
  });
}
// GET /books
// Hämta alla böcker.
async function getAll() {
  const sql = "SELECT * FROM books";
  const result = await initBooks(sql);
  return result;
}

// GET /books/:id
// Hämtar en bok.
function getBook(id) {
  const sql = "SELECT * FROM books WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.get(sql, id, (error, rows) => {
      if (error) {
        console.error(error.message);
        res.status(400);
        reject(error);
      }
      res.status(201);
      resolve(rows);
    });
  });
}

// POST /books
// Lägg till en bok.
function addBook(book) {
  const sql = "INSERT INTO books (title, author, genre) VALUES (?, ?, ?)";

  return new Promise((resolve, reject) => {
    db.run(sql, [book.title, book.author, book.genre], (error) => {
      if (error) {
        console.error(error.message);
        res.status(400);
        reject(error);
      }
      res.status(200);
      resolve();
    });
  });
}

// PUT /books/:id
// Uppdatera alla värden i databasen.
function putBook(id, book) {
  const sql = `UPDATE books SET title = "${book.title}", author = "${book.author}", genre = "${book.genre}" WHERE id = ${id}`;

  return new Promise((resolve, reject) => {
    db.run(sql, (error) => {
      if (error) {
        console.error(error.message);
        res.status(400);
        reject(error);
      }
      res.status(200);
      resolve();
    });
  });
}

// PATCH /books/:id
// Uppdaterar ett värde i databasen.
function patchBook(id, book) {
  const sql = `UPDATE books SET title = "${book}" WHERE id = ${id}`;

  return new Promise((resolve, reject) => {
    db.run(sql, (error) => {
      if (error) {
        console.error(error.message);
        res.status(400);
        reject(error);
      }
      res.status(200);
      resolve();
    });
  });
}

// DELETE /books/:id
// Ta bort en bok.
function deleteBook(id) {
  const sql = "DELETE FROM books WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.get(sql, id, (error) => {
      if (error) {
        console.error(error.message);
        res.status(400);
        reject(error);
      }
      res.status(204);
      resolve();
    });
  });
}

// Exportera funktionerna i module.exports.
module.exports = {
  getAll,
  getBook,
  addBook,
  putBook,
  patchBook,
  deleteBook,
};
