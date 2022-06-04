const uuid = require("uuid");
const db = require("../database.js");
let cars;

function initCars(params) {
  db.all(params, (err, rows) => {
    cars = rows;
  });
  return cars;
}
cars = initCars(`SELECT * from cars`);

function getAll() {
  return cars;
}

function getOne(id) {
  id = parseInt(id);
  cars = initCars(`SELECT * FROM cars WHERE id = ${id}`);
  return cars;
}

function addOne(data) {
  cars.push({
    id: uuid.v4(),
    brand: data.brand,
    model: data.model,
    reg: data.reg,
  });
  return cars;
}

function deleteOne(id) {
  id = parseInt(id);
  cars = initCars(`SELECT * FROM cars WHERE id != ${id}`);
  return cars;
}

function updateOne(id, data) {
  id = parseInt(id);
  const carIndex = cars.findIndex((car) => car.id === id);

  if (carIndex < 0) return 404;
  cars[carIndex] = {
    id: id,
    brand: data.brand,
    model: data.model,
    reg: data.reg,
  };
  return cars;
}

function patchOne(id, data) {
  id = parseInt(id);
  const carIndex = cars.findIndex((car) => car.id === id);

  if (carIndex < 0) return 404;
  if (data.reg) cars[carIndex].reg = data.reg;
  if (data.brand) cars[carIndex].brand = data.brand;
  if (data.model) cars[carIndex].model = data.model;

  return cars;
}

module.exports = {
  cars,
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
  patchOne,
};
