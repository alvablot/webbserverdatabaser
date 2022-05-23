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
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  const endpoints = req.url.split("/");

  const showAll = endpoints[1] === "todos" && !endpoints[2];

  const isGet = req.method === "GET";
  const isPost =
    req.method === "POST" && endpoints[1] === "todos" && !endpoints[2];
  const isPut = req.method === "PUT";
  const isPatch = req.method === "PATCH";
  const isDelete = req.method === "DELETE";
  const isOptions = req.method === "OPTIONS";
  let id = 0;
  if (!isNaN(parseInt(endpoints[2]))) id = parseInt(endpoints[2]);
  const containsTask = list.findIndex((list) => list.id === id) > -1;
  console.log(req.method);
  console.log(req.url);
  if (isGet && showAll) {
    res.statusCode = 200;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(list));
  } else if (isGet) {
    if (containsTask) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.statusCode = 200;
      const task = list.filter((task) => task.id === id);
      if (task[0]) {
        res.end(JSON.stringify(task));
      } else {
        res.statusCode = 404;
        res.end();
      }
    } else {
      res.statusCode = 404;
      res.end();
    }
  } else if (isPost) {
    res.statusCode = 201;
    let data;
    req.on("data", (chunk) => {
      const newTask = JSON.parse(chunk);
      console.log(Object.keys(newTask).length);
      if (!JSON.parse(chunk)) {
        res.statusCode = 400;
        res.end();
      } else if (Object.keys(newTask).length === 2) {
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
      } else {
        res.statusCode = 400;
        res.end();
      }
    });
    req.on("end", () => {
      if (!data) {
        res.statusCode = 400;
        res.end("The body of the request is invalid.");
      }
    });
  } else if (isDelete) {
    if (!containsTask) {
      res.statusCode = 400;
      res.end();
    }
    res.statusCode = 202;
    const newList = list.filter((task) => task.id !== id);
    list = newList;
    const newJson = JSON.stringify(newList, null, 2);
    fs.writeFile("./list.json", newJson, (err) => {
      if (err) throw err;
      console.log(`Deleted task ${id} from list.json`);
    });
    res.end();
  } else if (isPut) {
    if (!containsTask) {
      res.statusCode = 400;
      res.end();
    }
    res.statusCode = 202;
    const taskIndex = list.findIndex((list) => list.id === id);

    req.on("data", (chunk) => {
      if (!JSON.parse(chunk)) {
        res.statusCode = 400;
        res.end();
      }
      list[taskIndex] = JSON.parse(chunk);
      if (Object.keys(list[taskIndex]).length === 2) {
        list[taskIndex].id = id;
        console.log(list);
        console.log(id);
        const updatedList = JSON.stringify(list, null, 2);
        fs.writeFile("./list.json", updatedList, (err) => {
          if (err) throw err;
          console.log(
            `Updated (full) task ${list[taskIndex].id} from list.json`
          );
        });
      } else {
        res.statusCode = 400;
        res.end();
      }
    });
    res.end();
  } else if (isPatch) {
    if (!containsTask) {
      res.statusCode = 400;
      res.end();
    }
    res.statusCode = 202;
    const taskIndex = list.findIndex((list) => list.id === id);
    req.on("data", (chunk) => {
      const data = JSON.parse(chunk);
      if (Object.keys(data).length > 0 && Object.keys(data).length < 3) {
        if (data.task) {
          list[taskIndex].task = data.task;
        }
        if (data.fullfilled) {
          list[taskIndex].fullfilled = data.fullfilled;
        }
        const updatedList = JSON.stringify(list, null, 2);
        fs.writeFile("./list.json", updatedList, (err) => {
          if (err) throw err;
          console.log(
            `Updated (partial) task ${list[taskIndex].id} from list.json`
          );
        });
        res.end();
      } else {
        res.statusCode = 400;
        res.end();
      }
    });
  } else if (isOptions) {
    res.statusCode = 200;
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

    fetch("http://localhost:4000/todos/", {
    method: "POST",
    body: JSON.stringify({task: "Shop", fullfilled: "false"}),
    headers: { "Content-Type": "application/json" }
    })


    fetch("http://localhost:4000/todos/8", {
    method: "DELETE"
    })


    fetch("http://localhost:4000/todos/1", {
    method: "PUT",
    body: JSON.stringify({task: "Shop", fullfilled: "false"}),
    headers: { "Content-Type": "application/json" }
    })

    fetch("http://localhost:4000/todos/3", {
    method: "PATCH",
    body: JSON.stringify({task: "Hepp", fullfilled: "false"}),
    headers: { "Content-Type": "application/json" }
    })

*/
