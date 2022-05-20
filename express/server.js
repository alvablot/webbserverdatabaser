const express = require("express");
const app = express();
const logger = require("morgan");
const port = 4000;

const wikiRouter = require("./routes/wiki");

const tokenCheck = (req, res, next) => {
  const tokenExists = true;

  //throw Error();

  if (!tokenExists) {
    res.send("Du saknar en token, vänligen skicka med den här");
  } else {
    next();
  }
};

const enMiddleware = (req, res, next) => {
  console.log("Egen middleware");
  next();
};

app.post((req, res) => { // ??
  console.log("Post");
});
app.use(tokenCheck);
app.use(logger("dev")); // Väntar på res.send innan den skriver ut det i loggen
app.use("/wiki", (req, res, next) => {
  console.log("Inline mid");
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("My heart is broken");
});

app.use("/wiki", wikiRouter);

app.use(express.static("public"));
app.use("/images", express.static("images"));

app.get("/", enMiddleware, (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/* 
    fetch("http://localhost:3000", {
    method: "POST"
    })
*/
