
const express = require("express");
const app = express();
const port = 4000;
const fs = require("fs");

// Initialiserar en sqlite3-databas
const dbFile = "./data/cars_proj.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);

app.use(express.json());

app.get("/test", (req, res) => {
    db.all(
        "select * from cars"
    , (err, rows) => {
      res.json(rows);
    });
  });



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
/*
const express = require("express");
const port = 4000;
const fs = require("fs");

const app = express();

app.use(express.json());

// Initialiserar en sqlite3-databas
const dbFile = "./data/sqlite.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);

// om ./.data/sqlite.db inte finns, skapa den, annars skriver vi ut resultatet i konsollen
db.serialize(() => {
    if (!exists) {
      db.run(
        "CREATE TABLE Vegetables (id INTEGER PRIMARY KEY AUTOINCREMENT, vegetable TEXT)"
      );
      console.log("New table Vegetables created!");
  
      // Lägga till default-grönsaker
      db.serialize(() => {
        db.run(
          'INSERT INTO Vegetables (vegetable) VALUES ("Potato"), ("Swede"), ("Carrot")'
        );
      });
    } else {
      console.log('Database "Vegetables" ready to go!');
      db.each("SELECT * from Vegetables", (err, row) => {
        if (row) {
          console.log(`record: ${row.vegetable}`);
        }
      });
    }
  });
  
  app.get("/", (req, res) => {
    res.send("Routesen du letar efter finns under /vegetables");
  });



app.get("/vegetables", (req, res) => {
  db.all("SELECT * from Vegetables", (err, rows) => {
    res.json(rows);
  });
});

app.post("/vegetables", (req, res) => {
    console.log(`add to vegetables ${req.body.vegetable}`);
  
    // DISALLOW_WRITE is an ENV variable that gets reset for new projects
    // so they can write to the database
    if (!process.env.DISALLOW_WRITE) {
      // Städar upp strängen så vi kan undvika eventuella säkerhetsproblem
      const safeString = cleanString(req.body.vegetable);
  
      db.run(
        `INSERT INTO Vegetables (vegetable) VALUES (?)`,
        safeString,
        (error) => {
          if (error) {
            res.send({ message: "error!" });
          } else {
            res.send({ message: "success" });
          }
        }
      );
    }
  });
  
  const cleanString = (string) => {
    return string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  */