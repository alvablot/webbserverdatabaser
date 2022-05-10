const fs = require("fs");
const { parse } = require("csv-parse");
let i = 0;
const result = [];
fs.createReadStream("BirkakorsetData.csv", { encoding: "utf-8" })
  .pipe(
    parse({
      delimiter: ";",
    })
  )
  .on("data", (chunk) => {
    result.push(chunk);

  })
  .on("end", () => {
    console.log(`Totalt antal dagar ${result.length}`);
  })
  .on("error", () => {
    console.log("Kunde inte läsa filen");
  });
