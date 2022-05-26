const express = require("express");
const app = express();
const port = 4000;
const ownersDB = require("./owners.json");
const carsDB = require("./cars.json");
const relationsDB = require("./relations.json");

app.use(express.json());

const ownersArray = [];
let cars = [];
const relationsArray = [];

// Vi lägger till en router för ägarna
const ownersRouter = express.Router();
const carsRouter = express.Router();

ownersRouter.get("/owners", (req, res) => {
  res.send(ownersDB);
});
carsRouter.get("/cars", (req, res) => {
  res.send(carsDB);
});

ownersRouter.get("/owners/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let owner = ownersDB.filter((owner) => owner.id === id);
  const ownerRelation = relationsDB.filter((owner) => owner.ownerId === id);

  ownerRelation.forEach((element, i) => {
    cars[i] = carsDB.filter((car) => car.id === element.carId);
  });

  cars = cars.concat.apply([], cars);
  owner = owner.concat.apply([], owner);

  console.log(owner);
  console.log(cars);

  const resObj = {
    owner,
    cars,
  };

  res.send(resObj);
});
carsRouter.get("/cars/:id", (req, res) => {
  const id = parseInt(req.params.id);
  cars = carsDB.filter((car) => car.id === id);
  console.log(id);
  res.send(cars);
});

ownersRouter.delete("/owners/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Delete ${id} owner`);
});
carsRouter.delete("/cars/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Delete ${id} car`);
});

ownersRouter.post("/owners", (req, res) => {
  const name = req.body.name;
  res.send(name);
});
carsRouter.post("/cars", (req, res) => {
  const name = req.body.name;
  res.send(name);
});

app.use(ownersRouter);
app.use(carsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
