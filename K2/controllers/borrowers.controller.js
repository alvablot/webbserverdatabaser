const express = require("express");
const app = express();
const port = 4000;

//console.log(db);

const model = require("../models/borrowers.model");
const model2 = require("../models/books.model");

async function getBorrowers(req, res) {
  const result = await model.getAll();
  res.send(result);
}

async function getBorrower(req, res) {
  const id = req.params.id;
  result = await model.getOne(id);
  res.send(result);
}

async function postBorrower(req, res) {
  let data = req.body;
  const result = await model.addOne(data);
  //console.log(result);
  res.json(result);
}

async function deleteBorrower(req, res) {
  const id = req.params.id;
  result = await model.deleteOne(id);
  res.json(result);
}

async function putBorrower(req, res) {
  const id = req.params.id;
  const data = req.body;
  //console.log(data);
  const result = await model.updateOne(id, data);
  //if (result === 404) return res.status(404).json({ error: "Bil finns ej" });
  res.json(result);
}

async function patchBorrower(req, res) {
  const id = req.params.id;
  const data = req.body;
  const result = await model.patchOne(id, data);
  // if (result === 404) return res.status(404).json({ error: "Bil finns ej" });
  res.json(result);
}

module.exports = {
  getBorrower,
  getBorrowers,
  deleteBorrower,
  postBorrower,
  putBorrower,
  patchBorrower,
};
