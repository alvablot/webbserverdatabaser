const express = require("express");
const app = express();
const port = 4000;
const uuid = require("uuid");
const ownersDB = require("./owners.json");
const carsDB = require("./cars.json");
const relationsDB = require("./relations.json");

let owners = ownersDB;
let relations = [];
let cars = carsDB;

app.use(express.json());

const ownersRouter = express.Router();
const carsRouter = express.Router();

ownersRouter.get("/owners", (req, res) => {
  res.send(owners);
});
carsRouter.get("/cars", (req, res) => {
  res.send(cars);
});

ownersRouter.get("/owners/:id", (req, res) => {
  const id = req.params.id;
  let owner = ownersDB.find((owner) => owner.id === id);
  const ownerRelation = relationsDB.filter((owner) => owner.ownerId === id);
  let cars = [];
  ownerRelation.forEach((element) => {
    const car = carsDB.find((car) => car.id === element.carId);
    cars.push(car);
  });

  //cars = cars.concat.apply([], cars);
 // owner = owner.concat.apply([], owner);

  console.log(owner);
  console.log(cars);

  const resObj = {
    owner,
    cars,
  };

  res.send(resObj);
});


carsRouter.get("/cars/:id", (req, res) => {
  const id = req.params.id;
  cars = cars.filter((car) => car.id === id);
  console.log(id);
  res.send(cars);
});

ownersRouter.delete("/owners/:id", (req, res) => {
  const id = req.params.id;
  owners = owners.filter((owner) => owner.id !== id);

  res.send(owners);
});
carsRouter.delete("/cars/:id", (req, res) => {
  const id = req.params.id;
  cars = cars.filter((car) => car.id !== id);

  res.send(cars);
});

ownersRouter.post("/owners", (req, res) => {
  const data = req.body;
  owners.push({
    id: uuid.v4(),
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    licence: req.body.licence,
  });
  res.send(owners);
});
carsRouter.post("/cars", (req, res) => {
  if (!req.body.reg) {
    res.status(400).json({ error: "Inget regnummer" });
    return;
  }
  if (req.body.reg.length !== 6) {
    res.status(400).json({ error: "Felaktigt regnummer" });
    return;
  }
  cars.push({
    id: uuid.v4(),
    brand: req.body.brand,
    model: req.body.model,
    reg: req.body.reg,
  });
  res.send(cars);
});

carsRouter.put("/cars/:id", (req, res) => {
  const id = req.params.id;
  const carIndex = cars.findIndex((car) => car.id === id);
  console.log(carIndex);
  if (carIndex < 0) {
    return res.status(404).json({ error: "Bilen finns ej" });
  }

  const originalCar = cars[carIndex];
  cars[carIndex] = {
    id: id,
    brand: req.body.brand,
    model: req.body.model,
    reg: req.body.reg,
  };

  res.json(cars);
});

ownersRouter.put("/owners/:id", (req, res) => {
  const id = req.params.id;
  const ownerIndex = owners.findIndex((owner) => owner.id === id);
  console.log(ownerIndex);
  if (ownerIndex < 0) {
    return res.status(404).json({ error: "Ägare finns ej" });
  }

  owners[ownerIndex] = {
    id: id,
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    licence: req.body.licence,
  };

  res.json(owners);
});

carsRouter.patch("/cars/:id", (req, res) => {
  const id = req.params.id;
  const carIndex = cars.findIndex((car) => car.id === id);

  if (carIndex < 0) {
    return res.status(404).json({ error: "Bil finns ej" });
  }
  console.log(cars[carIndex]);

  if (req.body.reg) {
    cars[carIndex].reg = req.body.reg;
  }
  if (req.body.brand) {
    cars[carIndex].brand = req.body.brand;
  }
  if (req.body.model) {
    cars[carIndex].model = req.body.model;
  }

  res.json(cars);
});

ownersRouter.patch("/owners/:id", (req, res) => {
  const id = req.params.id;
  const ownerIndex = owners.findIndex((owner) => owner.id === id);

  if (ownerIndex < 0) {
    return res.status(404).json({ error: "Ägare finns ej" });
  }
  console.log(owners[ownerIndex]);

  if (req.body.name) {
    owners[ownerIndex].name = req.body.name;
  }
  if (req.body.age) {
    owners[ownerIndex].age = req.body.age;
  }
  if (req.body.email) {
    owners[ownerIndex].email = req.body.email;
  }
  if (req.body.licence) {
    owners[ownerIndex].licence = req.body.licence;
  }

  res.json(owners);
});

app.use(ownersRouter);
app.use(carsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


