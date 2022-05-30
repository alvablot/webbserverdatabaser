const uuid = require("uuid");
const ownersDB = require("../owners.json");
const relationsDB = require("../relations.json");
const carsDB = require("../cars.json");
let owners = ownersDB;

function getOne(id) {
  let owner = ownersDB.find((owner) => owner.id === id);
  const ownerRelation = relationsDB.filter((owner) => owner.ownerId === id);
  let cars = [];
  ownerRelation.forEach((element) => {
    const car = carsDB.find((car) => car.id === element.carId);
    cars.push(car);
  });

  const resObj = {
    owner,
    cars,
  };
  return resObj;
}

function addOne(data) {
  owners.push({
    id: uuid.v4(),
    name: data.name,
    age: data.age,
    email: data.email,
    licence: data.licence,
  });
  return owners;
}

function deleteOne(id) {
  //console.log(id);
  owners = owners.filter((owner) => owner.id !== id);
  //console.log(owners);
  return owners;
}

function updateOne(id, data) {
  const ownerIndex = owners.findIndex((owner) => owner.id === id);
  //console.log(ownerIndex);
  if (ownerIndex < 0) return 404;

  owners[ownerIndex] = {
    id: id,
    name: data.name,
    age: data.age,
    email: data.email,
    licence: data.licence,
  };
  return owners;
}

function patchOne(id, data) {
  const ownerIndex = owners.findIndex((owner) => owner.id === id);

  if (ownerIndex < 0) return 404;
  if (data.name) owners[ownerIndex].name = data.name;
  if (data.age) owners[ownerIndex].age = data.age;
  if (data.email) owners[ownerIndex].email = data.email;
  if (data.licence) owners[ownerIndex].licence = data.licence;

  return owners;
}

module.exports = {
  owners,
  getOne,
  addOne,
  deleteOne,
  updateOne,
  patchOne,
};
