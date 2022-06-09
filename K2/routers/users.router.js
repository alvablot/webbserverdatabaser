const express = require("express");
const usersController = require("../controllers/users.controller");
const usersRouter = express.Router();

const test = usersRouter.get("/users", usersController.getUsers);
usersRouter.get("/me/:id", usersController.getUser);
usersRouter.post("/auth/register", usersController.postUser);
usersRouter.delete("/users/:id", usersController.deleteUser);
usersRouter.patch("/user/:id", usersController.patchUser);
usersRouter.post("/auth/login", usersController.loginUser);
//usersRouter.patch("/users/lend", usersController.loginBorrower);
//usersRouter.patch("/users/return ", usersController.loginBorrower);
//usersRouter.patch("/auth/login", usersController.loginBorrower);

module.exports = usersRouter;
