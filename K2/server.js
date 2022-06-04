const express = require("express");
const app = express();
const port = 4000;


app.use(express.json());

//const ownersRouter = require("./routers/owners.router");
const booksRouter = require("./routers/books.router");

//app.use(ownersRouter);
app.use(booksRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

