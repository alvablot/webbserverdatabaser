const express = require("express");
const app = express();
const port = 4000;

//console.log(db);

const model = require("../models/books.model");

function getBooks(req, res) {
  res.json(model.getAll());
}

function getBook(req, res) {
  const id = req.params.id;
  res.send(model.getOne(id));
}

function postBook(req, res) {
  let data = req.body;
  /* if (!data.reg) {
    res.status(400).json({ error: "Inget regnummer" });
    return;
  }
  if (data.reg.length !== 6) {
    res.status(400).json({ error: "Felaktigt regnummer" });
    return;
  }*/
  res.send(model.addOne(data));
}
/*
function deleteBook(req, res) {
  const id = req.params.id;
  res.send(model.deleteOne(id));
}



function putBook(req, res) {
  const id = req.params.id;
  const data = req.body;
  //console.log(data);
  const result = model.updateOne(id, data);
  if (result === 404) return res.status(404).json({ error: "Bil finns ej" });
  res.send(result);
}

function patchBook(req, res) {
  const id = req.params.id;
  const data = req.body;
  const result = model.patchOne(id, data);
  if (result === 404) return res.status(404).json({ error: "Bil finns ej" });
  res.send(result);
}
*/
module.exports = {
  getBooks,
  getBook,
  //deleteBook,
  postBook,
  //putBook,
  //patchBook,
};
