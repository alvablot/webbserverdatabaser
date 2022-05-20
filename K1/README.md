# K1 API for Waiting List App

This repository is my first assigment in the Webbserverdatabaser course

### How to install

Download the back/server.js and back/list.json file and run with Node in your terminal 

```
$ node server.js
```

Then the server will listen on port 4000, 
http://localhost:4000

### GET all tasks

```JS
    fetch("http://localhost:4000/todos")
        .then(res => res.json())
        .then(json => console.log(json))

```

### GET specific task

```JS
    fetch("http://localhost:4000/todos/:id")
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
The server will automatically create a unique id

### DELETE task

```JS
    fetch("http://localhost:4000/todos/id", {
        method: "DELETE"
    })
```
### PUT (update full) task

```JS
    fetch("http://localhost:4000/todos/id", {
        method: "PUT",
        body: JSON.stringify({task: "String", // "What ever you want your task to be"
        fullfilled: "boolean"}), // Set "true" or "false"
        headers: { "Content-Type": "application/json" }
    })
```
### PATCH (update partial) task

```JS
    fetch("http://localhost:4000/todos/id", {
        method: "PATCH",
        body: JSON.stringify({task: "String", // "What ever you want your task to be" or skip
        fullfilled: "boolean"}), // Set "true" or "false" or skip
        headers: { "Content-Type": "application/json" }
    })
```


