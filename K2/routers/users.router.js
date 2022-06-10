const express = require("express");
const usersController = require("../controllers/users.controller");

const usersRouter = express.Router();

const test = usersRouter.get("/users", usersController.getUsers);
usersRouter.get("/me", usersController.getUser);
usersRouter.post("/auth/register", usersController.postUser);
usersRouter.delete("/users/:id", usersController.deleteUser);
usersRouter.patch("/users/:id", usersController.patchUser);
usersRouter.post("/auth/login", usersController.loginUser);
usersRouter.post("/users/lend", usersController.lendUser);
usersRouter.post("/users/return", usersController.returnUser);
//usersRouter.patch("/auth/login", usersController.loginBorrower);

module.exports = usersRouter;
