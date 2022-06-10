const express = require("express");
const booksController = require("../controller/books.controller");
const booksRouter = express.Router();

booksRouter.get("/books", booksController.getAll);
booksRouter.get("/books/:id", booksController.getBook);
booksRouter.post("/books", booksController.postBook);
booksRouter.put("/books/:id", booksController.putBook);
booksRouter.patch("/books/:id", booksController.patchBook);
booksRouter.delete("/books/:id", booksController.deleteBook);

module.exports = booksRouter;
