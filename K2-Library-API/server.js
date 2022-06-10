// Express
const express = require("express");
// Hämta App med express.
const app = express();
const port = 5000;

// Hämta books.model.js
// const model = require("./models/books.model");

app.use(express.json());
// books Router
const booksRouter = require("./routers/books.router");

app.use(booksRouter);
// Vet inte om jag behöver denna: app.use(booksController);

/**
 * Lägg till alla metoder med
 * app.get, /app.post, /app.put, /app.patch, /app.delete.
 */

//app.get("/books", booksController.getAll);
//app.get("books/:id", booksController.getBook);
//app.post("/books", booksController.addBook);
//app.put("/books/:id", booksController.putBook);
//app.patch("/books/:id", booksController.patchBook);
//app.delete("/books/:id", booksController.deleteBook);

app.listen(port, () => {
  console.log(`Server körs på serverport ${port}`);
});
