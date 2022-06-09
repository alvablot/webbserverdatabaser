const express = require("express");
const app = express();
const port = 4000;

const model = require("../models/users.model");

async function getUsers(req, res) {
  const result = await model.getAll();
  res.json(result);
}

async function getUser(req, res) {
  const id = req.params.id;
  result = await model.getOne(id);
  res.json(result);
}

async function loginUser(req, res) {
  const id = req.params.id;
  let data = req.body;
  result = await model.login(id, data);
  if (result === 400) return res.status(400).send("Du måste skicka med email och lösenord");
  if (result === 404) return res.status(404).send("Fel användarnamn/lösenord");
  res.json(result);
}

async function postUser(req, res) {
  let data = req.body;
  let result = await model.addOne(data);
  if (result === 400) return res.status(400).send("Du måste skicka med all input");
  if (result === 409) return res.status(409).send("Användaren finns redan");
  res.json(result);
}

async function deleteUser(req, res) {
  const id = req.params.id;
  result = await model.deleteOne(id);
  res.json(result);
}

async function patchUser(req, res) {
  const id = req.params.id;
  const data = req.body;
  const result = await model.patchOne(id, data);
  // if (result === 404) return res.status(404).json({ error: "Bil finns ej" });
  res.json(result);
}

module.exports = {
  getUser,
  getUsers,
  loginUser,
  deleteUser,
  postUser,
  patchUser,
};
