require("dotenv").config();
const express = require("express");
const fs = require("fs");
const app = express();
const port = 4000;

const jwt = require("jsonwebtoken");

const auth = require("./middlewares/auth");

const log = (req, res, next) => {
  res.on("finish", () => {
    //let info = JSON.stringify(req.body, null, 2);
    let now = new Date();
    let { ip, method, url, protocol, hostname } = req;
    let logRow = `${now} IP: ${ip} ${method}/${url} on: ${protocol}://${hostname}:${port} status: ${res.statusCode} \n`;
    fs.writeFile("./log.txt", logRow, { flag: "a+" }, (err) => {
      if (err) throw err;
      console.log("Log updated");
    });
  });
  next();
};

app.use(express.json());

const usersRouter = require("./routers/users.router");
const booksRouter = require("./routers/books.router");

app.use(log);
app.use(booksRouter);
app.use(usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

