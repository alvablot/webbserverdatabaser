const express = require("express");
const ownersController = require("../controllers/owners.controller");
const ownersRouter = express.Router();



ownersRouter.get("/owners", ownersController.getOwners);
ownersRouter.get("/owners/:id", ownersController.getOwner);
ownersRouter.post("/owners", ownersController.postOwner);
ownersRouter.delete("/owners/:id", ownersController.deleteOwner);
ownersRouter.put("/owners/:id", ownersController.putOwner);
ownersRouter.patch("/owners/:id", ownersController.patchOwner);

module.exports = ownersRouter;
