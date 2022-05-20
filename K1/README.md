# K1 API for Waiting List App

This repository is my the first assigment in Webbserverdatabaser

### How to install

Download the back/server.js and back/list.json file and run your terminal with Node

```
$ node server.js
```

Then the server will listen on port 4000, 
http://localhost:4000

### GET all tasks

```JS
    fetch('http://localhost:4000/todos')
            .then(res => res.json())
            .then(json => console.log(json))

```

### GET specific task

```JS
    fetch('http://localhost:4000/todos/:ID')
            .then(res => res.json())
            .then(json => console.log(json))
```

### POST new task

```JS
    fetch("http://localhost:4000/todos/", {
     method: "POST",
     body: JSON.stringify({task: "String", // "What ever you want your task to be"
     fullfilled: "boolean"}), // Set "true" or "false"
     headers: { "Content-Type": "application/json" }
    })
```
The server will automatically create a unique ID

### DELETE task

```JS
    fetch("http://localhost:4000/todos/:ID", {
     method: "DELETE"
    })
```
### PUT (update full) ask

```JS
    fetch("http://localhost:4000/todos/:ID", {
     method: "PUT",
     body: JSON.stringify({task: "String", // "What ever you want your task to be"
     fullfilled: "boolean"}), // Set "true" or "false"
     headers: { "Content-Type": "application/json" }
    })
```
### PATCH (update partial) ask

```JS
    fetch("http://localhost:4000/todos/:ID", {
     method: "PATCH",
     body: JSON.stringify({task: "String", // "What ever you want your task to be" or skip
     fullfilled: "boolean"}), // Set "true" or "false" or skip
     headers: { "Content-Type": "application/json" }
    })
```


