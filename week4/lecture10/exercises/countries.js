const express = require("express");
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

app.get("/countries/:countrycode", function (req, res) {
  let cCode = req.params.countrycode;
  const country = countries.filter((country) => country.alpha2Code === cCode); //alpha2Code
  res.send(country);
});

app.get("/countries", (req, res) => {
  let viewCountries = [];
  let page = parseInt(req.query.page);
  let size = parseInt(req.query.size);
  let end = (page * 2 * size) / 2;
  let start = end - size;
  let viewI = 0;
  for (let i = start; i < end; i++) {
    if (i >= countries.length) break;
    else {
      viewCountries[viewI] = countries[i].name;
      viewI++;
    }
  }

  res.send(viewCountries);
  console.log(viewCountries);
  console.log(viewCountries.length);
  res.end();
});
app.get("/countries", (req, res) => {});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
