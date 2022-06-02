const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./data/cars_proj.db", (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }

  console.log("Ansluten till cars_proj");

});

module.exports = db;