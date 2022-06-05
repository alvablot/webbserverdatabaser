const express = require("express");
const app = express();
const port = 4000;

app.use(express.json());

const borrowersRouter = require("./routers/borrowers.router");
const booksRouter = require("./routers/books.router");

app.use(borrowersRouter);
app.use(booksRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

