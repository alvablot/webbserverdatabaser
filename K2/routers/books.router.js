const express = require("express");
const booksController = require("../controllers/books.controller");
const booksRouter = express.Router();

booksRouter.get("/books", booksController.getBooks);
booksRouter.get("/books/:id", booksController.getBook);
booksRouter.post("/books", booksController.postBook);
booksRouter.delete("/books/:id", booksController.deleteBook);

booksRouter.put("/books/:id", booksController.putBook);
booksRouter.patch("/books/:id", booksController.patchBook);

module.exports = booksRouter;
