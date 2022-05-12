const fs = require("fs");
const { parse } = require("csv-parse");
let i = 0;
const result = [];
const good = [];
const everage = [];
const bad = [];
const veryBad = [];
const extremelyBad = [];

fs.createReadStream("BirkakorsetData.csv", { encoding: "utf-8" })
  .pipe(
    parse({
      delimiter: ";",
    })
  )
  .on("data", (chunk) => {
    chunk[0] = chunk[0].substring(0, 10);
    chunk[1] = chunk[1].substring(0, 10);
    chunk[2] = parseFloat(chunk[2]);
    result.push(chunk);
    if (chunk[2] > 40) {
        good.push(chunk[2]);
    }
    if (chunk[2] > 40 && chunk[2] < 80) everage.push(chunk[2]);
    if (chunk[2] > 80 && chunk[2] < 120) bad.push(chunk[2]);
    if (chunk[2] > 120 && chunk[2] < 300) veryBad.push(chunk[2]);
    if (chunk[2] > 300) extremelyBad.push(chunk[2]);
  })
  .on("end", () => {
    console.log(`Alla dagar ${result.length / 24}`);
    //console.log(`${result}`);
   /* console.log(`Bra dagar ${good.length}`);
    console.log(`Medel dagar ${everage.length}`);
    console.log(`Dåliga dagar ${bad.length}`);
    console.log(`Mycket dåliga dagar ${veryBad.length}`);
    console.log(`Extremt dåliga dagar ${extremelyBad.length}`);*/
  })
  .on("error", () => {
    console.log("Kunde inte läsa filen");
  });
