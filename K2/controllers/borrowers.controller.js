const express = require("express");
const app = express();
const port = 4000;

//console.log(db);

const model = require("../models/borrowers.model");

function getBorrowers(req, res) {
  res.send(model.getAll());
}

function getBorrower(req, res) {
  const id = req.params.id;
  res.send(model.getOne(id));
}

function postBorrower(req, res) {
  let data = req.body;
  res.send(model.addOne(data));
}

function deleteBorrower(req, res) {
  const id = req.params.id;
  //console.log(id)
  res.send(model.deleteOne(id));
}

function putBorrower(req, res) {
  const id = req.params.id;
  const data = req.body;
  //console.log(data);
  const result = model.updateOne(id, data);
  //if (result === 404) return res.status(404).json({ error: "Bil finns ej" });
  res.send(result);
}

function patchBorrower(req, res) {
  const id = req.params.id;
  const data = req.body;
  const result = model.patchOne(id, data);
 // if (result === 404) return res.status(404).json({ error: "Bil finns ej" });
  res.send(result);
}

module.exports = {
  getBorrower,
  getBorrowers,
  deleteBorrower,
  postBorrower,
  putBorrower,
  patchBorrower,
};
