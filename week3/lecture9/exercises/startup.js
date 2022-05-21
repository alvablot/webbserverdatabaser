const express = require("express");
const app = express();
//const logger = require("morgan");

const port = 5000;

const logger = (req, res, next) => {
  console.log(req.method);
  console.log(req.url);
  next();
};

const checkString = (req, res, next) => {
  const isString = typeof req.body[0].value === "string";
  if (isString) console.log(isString);
  else throw Error();
  next();
};

app.use(express.json());
app.use(checkString);

app.post("/uppercase", logger, (req, res) => {
  const resToUp = { value: req.body[0].value.toUpperCase() };
  res.send(resToUp);
  res.end();
});

app.post("/lowercase", logger, (req, res) => {
  const resToLow = { value: req.body[0].value.toLowerCase() };
  res.send(resToLow);
  res.end();
});

app.post("/capitalizad", logger, (req, res) => {
  let makeCapitalizad = req.body[0].value.substring(0, 1).toUpperCase();
  makeCapitalizad += req.body[0].value.substring(1, req.body[0].value.length).toLowerCase();
  const resToCapitalizad = { value: makeCapitalizad };
  res.send(resToCapitalizad);
  res.end();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("My heart is broken");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/*
    fetch("http://localhost:5000/uppercase", {
    method: "POST",
    body: JSON.stringify({value: "dfdsfdsf"}),
    headers: { "Content-Type": "application/json" }
    })
*/
