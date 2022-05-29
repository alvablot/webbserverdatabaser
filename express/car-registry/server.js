const express = require("express");
const app = express();
const port = 4000;
const ownersController = require("./controllers/owners.controller");
const carsController = require("./controllers/cars.controller");

app.use(express.json());

const ownersRouter = express.Router();
const carsRouter = express.Router();

ownersRouter.get("/owners", ownersController.getOwners);
ownersRouter.get("/owners/:id", ownersController.getOwner);
ownersRouter.post("/owners", ownersController.postOwner);
ownersRouter.delete("/owners/:id", ownersController.deleteOwner);
ownersRouter.put("/owners/:id", ownersController.putOwner);
ownersRouter.patch("/owners/:id", ownersController.patchOwner);

carsRouter.get("/cars", carsController.getCars);
carsRouter.get("/cars/:id", carsController.getCar);
carsRouter.post("/cars", carsController.postCar);
carsRouter.delete("/cars/:id", carsController.deleteCar);
carsRouter.put("/cars/:id", carsController.putCar);
carsRouter.patch("/cars/:id", carsController.patchCar);


app.use(ownersRouter);
app.use(carsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


