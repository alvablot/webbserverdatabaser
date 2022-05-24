const express = require("express");
const querystring = require("querystring");
const app = express();
const port = 4000;
const fs = require("fs");

fs.readFile("./countries.json", (error, data) => {
  if (error) {
    console.log("Filen kunde inte öppnas");
    return;
  }
  countries = JSON.parse(data);
});

app.get("/", (req, res) => {
  let page = parseInt(req.query.page);
  let size = parseInt(req.query.size);
  res.send(`Page ${page}, size ${size}`);
  console.log(`Page ${page + size}`);
  res.end();
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
