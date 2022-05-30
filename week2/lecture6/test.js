const http = require("http");
const port = 5000;


const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
 /* res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );*/
  console.log(req.method)
  res.end();
});

server.listen(port, () => {
  console.log(`Servern kör på port ${port}`);
});

/*
    const id = Math.round(Math.random() * 99999)
    fetch("http://localhost:5000/api/persons/1", {
    method: "POST",
    body: JSON.stringify({ id: id, name: "Ryan Dahl", number: "666" }),
    headers: { "Content-Type": "application/json" }
    })


    fetch("http://localhost:5000/api/persons/5", {
    method: "DELETE"
    })

*/
