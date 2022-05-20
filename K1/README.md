# Read me - K1 API for Waiting List App

This repository is my the first assigment in Webbserverdatabaser

### How to install

Download the server.js and list.json file and run it in your terminal with Node

```
$ node server.js
```

Then the server will listen on port 4000, wich you can open in your browser
http://localhost:4000

### GET all tasks

```JS
    fetch('http://localhost:4000/todos')
            .then(res => res.json())
            .then(json => console.log(json))

```

### GET specific task from the .json file

```JS
    fetch('http://localhost:4000/todos/:ID')
            .then(res => res.json())
            .then(json => console.log(json))
```

### POST new task to the .json file

```JS
    fetch("http://localhost:4000/todos/", {
    method: "POST",
    body: JSON.stringify({task: "String", fullfilled: boolean}),
    headers: { "Content-Type": "application/json" }
    })
```




