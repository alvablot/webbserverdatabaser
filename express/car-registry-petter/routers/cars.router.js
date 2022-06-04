const express = require("express");
const carsController = require("../controllers/cars.controller");
const carsRouter = express.Router();

carsRouter.get("/cars", carsController.getCars);
carsRouter.get("/cars/:id", carsController.getCar);
carsRouter.post("/cars", carsController.postCar);
carsRouter.delete("/cars/:id", carsController.deleteCar);
carsRouter.put("/cars/:id", carsController.putCar);
carsRouter.patch("/cars/:id", carsController.patchCar);

module.exports = carsRouter;
