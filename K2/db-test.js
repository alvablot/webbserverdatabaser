
const express = require("express");
const app = express();
const port = 4000;
const fs = require("fs");

const db = require("./database.js");
console.log(db);

app.use(express.json());

app.get("/test", (req, res) => {
    db.all(
        "select * from books"
    , (err, rows) => {
      res.json(rows);
    });
  });



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });