const http = require("http");
const fs = require("fs");
const port = 5000;
let people = [{}];
const documentStart = "<html><head><meta charset='UTF-8'></head><body>";
const documentEnd = "</body></html>";

const days = [
  "Söndag",
  "Måndag",
  "Tisdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lördag",
];
const months = [
  "januari",
  "februari",
  "mars",
  "april",
  "maj",
  "juni",
  "juli",
  "augusti",
  "septemner",
  "oktober",
  "november",
  "december",
];
function getDateStamp() {
  const now = new Date();
  const year = now.getYear();
  const month = now.getMonth();
  const day = now.getDay();
  const date = now.getDate();
  const hour = now.getHours();
  let minute = now.getHours();
  if (minute < 10) minute = "0" + minute;
  let second = now.getSeconds();
  if (second < 10) second = "0" + second;
  const dateStamp = `${days[day]} ${date} ${months[month]} ${
    year + 1900
  } Kl ${hour}:${minute}:${second}`;
  return dateStamp;
}

fs.readFile("./people.json", (error, data) => {
  if (error) {
    console.log("Filen kunde inte öppnas");
    return;
  }
  people = JSON.parse(data);
});

const server = http.createServer((req, res) => {
  console.log(`${req.method} till url: ${req.url}`);
  const items = req.url.split("/");
  //let id = 0;
  let oName;
  let oId;
  let oNumber;
  if (items[3]) {
    const id = parseInt(items[3]);
    people.forEach((element, i) => {
      if (parseInt(element.id) === id) {
        oName = element.name;
        oId = element.id;
        oNumber = element.number;
      }
    });
  }

  if (items[1] === "api" && items[2] === "persons" && items[3]) {
    if (oId === undefined) {
      res.statusCode = 404;
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.write(documentStart);
      res.write(`
            <h1>Person</h1>
            `);
      res.write(`
        <p>${oId}</p>
        <p>${oName}</p>
        <p>${oNumber}</p>
        <p>${getDateStamp()}</p>
      `);
      res.write(documentEnd);
    }
  }
  if (items[1] === "info") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write(documentStart);
    res.write(`
            <h1>Namnlista</h1>
            `);
    res.write(`
        <p>Din kontaktlista innehåller ${people.length} kontakter</p>
        <p>${getDateStamp()}</p>
     `);
    res.write(documentEnd);
  }
  if (req.method === "POST") {
    // Här kanske vi vill ha lite logik

    req.on("data", (chunk) => {
      //console.log(chunk.toString());
      const data = chunk.toString();
      const newPerson = JSON.parse(data);
      people.forEach((element, i) => {
        if (newPerson.id === element.id) {
          res.statusCode = 409;
          console.log(`ID ${element.id} finns redan`);
        }
        if (newPerson.name === element.name) {
          res.statusCode = 409;
          console.log(`Namn ${element.name} finns redan`);
        }
      });
      if (res.statusCode !== 409) {
        people.push(newPerson);

        const newJson = JSON.stringify(people, null, 2);

        fs.writeFile("./people.json", newJson, (error) => {
          if (error) {
            console.log("Filen kunde inte skrivas");
            return;
          }
          console.log(data);
        });
        res.statusCode = 201;
      }
    });
  } else if (req.method === "DELETE" && !isNaN(parseInt(items[3]))) {
    people.forEach((element, i) => {
      if (element.id === parseInt(items[3])) {
        if (i == 0) people.splice(0, 1);
        people.splice(i, i);
        console.log(`Delete ${element.id}`);
        console.log(`Delete ${element.name}`);

        const stringifiedJson = JSON.stringify(people, null, 2);
        fs.writeFile("./people.json", stringifiedJson, (err) => {
          if (err) throw err;
          console.log("Wrote to people.json");
        });
      }
    });
    res.statusCode = 201;
  } else {
    res.statusCode = 404;
  }

  res.end();
});

server.listen(port, () => {
  console.log(`Servern kör på port ${port}`);
});

/*

    fetch("http://localhost:5000/info", {
    method: "POST",
    body: JSON.stringify({ id: 5, name: "Ryan Dahl", number: "666" }),
    headers: { "Content-Type": "application/json" }
    })


    fetch("http://localhost:5000/api/persons/1", {
    method: "DELETE"
    })

*/
