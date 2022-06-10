require("dotenv").config();
const express = require("express");
const fs = require("fs");
const app = express();
const port = require("./routers/endpoints");
const jwt = require("jsonwebtoken");
const timeStamp = require("./middlewares/timeStamp");
const auth = require("./middlewares/auth");

const log = (req, res, next) => {
  res.on("finish", () => {
    let info = JSON.stringify(req.body, null, 2);
    let now = new Date();
    let { ip, method, url, protocol, hostname } = req;
    let logRow = `${now} IP: ${ip} 
Body ${info} ${method}/${url} on: ${protocol}://${hostname}:${port} status: ${res.statusCode}
    
`;
    fs.writeFile("./log.txt", logRow, { flag: "a+" }, (err) => {
      if (err) throw err;
      console.log("Log updated");
    });
  });
  next();
};
/*
const log = (req, res, next) => {
  const { method, url, hostname } = req;
  res.on("finish", () => {
    let mess = "";
    let id;
    if (req.params.id === undefined) id = false;
    else id = req.params.id;
    let now = timeStamp();
    endpoints = url.split("/");
    console.log(id);
    if (endpoints[1] === "auth") {
      if (endpoints[2] === "register") mess = "Skapa ny användare";
      if (endpoints[2] === "login") mess = "Loggar in användare";
    } 
    if (endpoints[1] === "books") {
      if (id && method === "POST") mess = "Skapa ny bok";
      if (id && method === "GET") mess = "Hämta bok";
      if (id && method === "PATCH") mess = "Uppdatera bok";
      if (id && method === "DELETE") mess = "Ta bort bok";
    }
    if (endpoints[1] === "users") { 
      if (endpoints[2] === "lend") mess = "Låna bok";
      if (endpoints[2] === "return") mess = "Återlämna bok";
    }
    if (endpoints[1] === "me") mess = "Hämta info om inloggad användare";

    let logRow = `Status ${res.statusCode} ${method}, ${url} ${mess}  ${app.use(
      timeStamp
    )} ${hostname}:${port} \n`;

    fs.writeFile("./log.txt", logRow, { flag: "a+" }, (err) => {
      if (err) throw err;
      console.log("Log updated");
    });
  });
  next();
};
*/
app.use(express.json());

const usersRouter = require("./routers/users.router");
const booksRouter = require("./routers/books.router");
//app.use(timeStamp);
app.use(log);
app.use(booksRouter);
app.use(usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
