const http = require("http");
const fs = require("fs");
const port = 3000;
let list = [{}];

fs.readFile("./list.json", (error, data) => {
  if (error) {
    console.log("Filen kunde inte öppnas");
    return;
  }
  list = JSON.parse(data);
  //console.log(list);
});

const app = http.createServer((req, res) => {
  const endpoints = req.url.split("/");

  const showAll = endpoints[1] === "todos" && !endpoints[2];

  const isGet = req.method === "GET";
  const isPost = req.method === "POST";
  const isPut = req.method === "PUT";
  const isPatch = req.method === "PATCH";
  const isDelete = req.method === "DELETE";
  let id = 0;
  if (!isNaN(parseInt(endpoints[2]))) id = parseInt(endpoints[2]);

  //console.log(endpoints);
  if (isGet && showAll) {
    res.statusCode = 200;
    res.write(`Hämta alla todos`);
    //console.log(list);
    res.end();
  } else if (isGet && id > 0) {
    res.statusCode = 200;
    res.write(`Hämta todo id ${list[id].id} ${list[id].task}`);
    res.end();
  } else if (isPost) {
    req.on("data", (chunk) => {
      const newTask = JSON.parse(chunk);
      console.log(newTask);
      list.push(newTask);
      const newJson = JSON.stringify(list, null, 2);
      fs.writeFile("./list.json", newJson, (err) => {
        if (err) throw err;
        console.log("Added task to list.json");
      });

      res.end();
    });
  } else if (isDelete && id > 0) {
    //list = list.filter((task) => task.id !== id);
    console.log(`Delete ${id}`);
    res.statusCode = 204;
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

app.listen(port, () => {
  console.log(`Applikationen körs på port ${port}`);
});

/*

        fetch("http://localhost:3000/todos/", {
        method: "POST",
        body: JSON.stringify({task: "Shop", fullfilled: "false", id: 8 }),
        headers: { "Content-Type": "application/json" }
        })

    fetch("http://localhost:3000/todos/8", {
    method: "DELETE"
    })

*/
