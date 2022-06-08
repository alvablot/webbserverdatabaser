const express = require("express");
const borrowersController = require("../controllers/borrowers.controller");
const borrowersRouter = express.Router();

//const morgan = require("morgan");
//borrowersRouter.use(morgan("dev"));

const test = borrowersRouter.get("/borrowers", borrowersController.getBorrowers);
borrowersRouter.get("/borrowers/:id", borrowersController.getBorrower);
borrowersRouter.post("/borrowers", borrowersController.postBorrower);
borrowersRouter.delete("/borrowers/:id", borrowersController.deleteBorrower);
borrowersRouter.put("/borrowers/:id", borrowersController.putBorrower);
borrowersRouter.patch("/borrowers/:id", borrowersController.patchBorrower);

module.exports = borrowersRouter;
