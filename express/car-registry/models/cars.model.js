const uuid = require("uuid");
let cars = require("../cars.json");

function getOne(id) {
  const car = cars.filter((car) => car.id === id);
  //console.log(cars);
  return car;
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
  cars = cars.filter((car) => car.id !== id);
  return cars;
}

function updateOne(id, data) {
  const carIndex = cars.findIndex((car) => car.id === id);
  //console.log(carIndex);
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
  const carIndex = cars.findIndex((car) => car.id === id);

  if (carIndex < 0) return 404;
  if (data.reg) cars[carIndex].reg = data.reg;
  if (data.brand) cars[carIndex].brand = data.brand;
  if (data.model) cars[carIndex].model = data.model;

  return cars;
}

module.exports = {
  //carsDB: carsDB,
  cars,
  getOne,
  addOne,
  deleteOne,
  updateOne,
  patchOne,
};
