const express = require("express");
const app = express();
const port = 4000;

app.use(express.json());

const db = require("../db_");
console.log(db);
/*
async function getDB() {
  db.run("SELECT * FROM cars", (error, row) => {
    if (row) {
      console.log(row);
    }
  });
}
*/

const model = require("../models/cars.model");

function getCars(req, res) {
  res.send(model);
}

function getCar(req, res) {
  const id = req.params.id;
  res.send(model.getOne(id));
}

function deleteCar(req, res) {
  const id = req.params.id;
  res.send(model.deleteOne(id));
}

function postCar(req, res) {
  const data = req.body;
  //console.log()
  if (!data.reg) {
    res.status(400).json({ error: "Inget regnummer" });
    return;
  }
  if (data.reg.length !== 6) {
    res.status(400).json({ error: "Felaktigt regnummer" });
    return;
  }
  res.send(model.addOne(data));
}

function putCar(req, res) {
  const id = req.params.id;
  const data = req.body;
  //console.log(data);
  const result = model.updateOne(id, data);
  if (result === 404) return res.status(404).json({ error: "Bil finns ej" });
  res.send(result);
}

function patchCar(req, res) {
  const id = req.params.id;
  const data = req.body;
  const result = model.patchOne(id, data);
  if (result === 404) return res.status(404).json({ error: "Bil finns ej" });
  res.send(result);
}

module.exports = {
  getCars,
  getCar,
  deleteCar,
  postCar,
  putCar,
  patchCar,
};
