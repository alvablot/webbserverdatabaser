const http = require("http");
const fs = require("fs");
const port = 4000;
let list = [{}];

fs.readFile("./list.json", (error, data) => {
  if (error) {
    console.log("Filen kunde inte öppnas");
    return;
  }
  list = JSON.parse(data);
});

const app = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  const endpoints = req.url.split("/");

  const showAll = endpoints[1] === "todos" && !endpoints[2];

  const isGet = req.method === "GET";
  const isPost = req.method === "POST";
  const isPut = req.method === "PUT";
  const isPatch = req.method === "PATCH";
  const isDelete = req.method === "DELETE";
  let id = 0;
  if (!isNaN(parseInt(endpoints[2]))) id = parseInt(endpoints[2]);
  console.log(req.method);
  if (isGet && showAll) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.write(`Hämta alla todos`);
    //console.log(list);
    res.end();
  } else if (isGet && id > 0) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    const task = list.filter((task) => task.id === id);

    if (task[0]) {
      res.write(`Hämta todo id ${task[0].id} ${task[0].task}`);
      res.end();
    } else {
      res.statusCode = 404;
      res.end();
    }
  } else if (isPost) {
    res.statusCode = 201;
    req.on("data", (chunk) => {
      const newTask = JSON.parse(chunk);
      console.log(newTask);
      newTask.id = new Date().getTime() * Math.round(Math.random() * 999999);
      console.log(newTask.id);
      list.push(newTask);
      const newJson = JSON.stringify(list, null, 2);
      fs.writeFile("./list.json", newJson, (err) => {
        if (err) throw err;
        console.log("Added task to list.json");
      });

      res.end();
    });
  } else if (isDelete && id > 0) {
    res.statusCode = 202;
    const newList = list.filter((task) => task.id !== id);

    list.push(newList);
    const newJson = JSON.stringify(newList, null, 2);
    fs.writeFile("./list.json", newJson, (err) => {
      if (err) throw err;
      console.log(`Deleted task ${id} from list.json`);
    });

    res.end();
  } else if (isPut && id > 0) {
    res.statusCode = 202;
    const taskIndex = list.findIndex((list) => list.id === id);

    req.on("data", (chunk) => {
      list[taskIndex] = JSON.parse(chunk);
      list[taskIndex].id = id;
      console.log(list);
      console.log(id);
      const updatedList = JSON.stringify(list, null, 2);
      fs.writeFile("./list.json", updatedList, (err) => {
        if (err) throw err;
        console.log(`Updated (full) task ${list[taskIndex].id} from list.json`);
      });
    });
    res.end();
  } else if (isPatch && id > 0) {
    res.statusCode = 202;
    const taskIndex = list.findIndex((list) => list.id === id);
    req.on("data", (chunk) => {
      const data = JSON.parse(chunk);

      if (data.task) {
        list[taskIndex].task = data.task;
      }
      const updatedList = JSON.stringify(list, null, 2);
      fs.writeFile("./list.json", updatedList, (err) => {
        if (err) throw err;
        console.log(
          `Updated (partial) task ${list[taskIndex].id} from list.json`
        );
      });
    });
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

    fetch("http://localhost:3001/todos/", {
    method: "POST",
    body: JSON.stringify({task: "Shop", fullfilled: "false", id: 8 }),
    headers: { "Content-Type": "application/json" }
    })


    fetch("http://localhost:3001/todos/8", {
    method: "DELETE"
    })


    fetch("http://localhost:3001/todos/1", {
    method: "PUT",
    body: JSON.stringify({task: "Shop", fullfilled: "false"}),
    headers: { "Content-Type": "application/json" }
    })

    fetch("http://localhost:3001/todos/3", {
    method: "PATCH",
    body: JSON.stringify({task: "Hepp", fullfilled: "false"}),
    headers: { "Content-Type": "application/json" }
    })

*/
