const express = require("express");
const app = express();
const port = 4000;
//bodyParser.json
app.use(express.json());

app.set("view engine", "pug");

app.get("/todos/:id", (req, res) => {
  res.send(req.params);
});

app.get("/", (req, res) => {
  res.render("index", { title: "Puggis", message: "Hello MF!" });
});

app.post("/todos", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
