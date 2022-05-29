const express = require("express");
const app = express();
const port = 4000;
const uuid = require("uuid");
const ownersController = require("./controllers/owners.controller");
const carsController = require("./controllers/cars.controller");
const ownersDB = require("./owners.json");
const carsDB = require("./cars.json");
const relationsDB = require("./relations.json");

let owners = ownersDB;
let relations = [];
let cars = carsDB;

app.use(express.json());

const ownersRouter = express.Router();
const carsRouter = express.Router();

ownersRouter.get("/owners", ownersController.getOwners);
ownersRouter.get("/owners/:id", ownersController.getOwner);
ownersRouter.post("/owners", ownersController.postOwners);
ownersRouter.delete("/owners/:id", ownersController.deleteOwner);
ownersRouter.put("/owners/:id", ownersController.putOwner);
ownersRouter.patch("/owners/:id", ownersController.patchOwner);

carsRouter.get("/owners", carsController.getCars);
carsRouter.get("/owners/:id", carsController.getCar);
carsRouter.post("/owners", carsController.postCars);
carsRouter.delete("/owners/:id", carsController.deleteCar);
carsRouter.put("/owners/:id", carsController.putCar);
carsRouter.patch("/owners/:id", carsController.patchCar);


app.use(ownersRouter);
app.use(carsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


