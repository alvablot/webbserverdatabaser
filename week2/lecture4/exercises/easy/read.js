const fs = require("fs");

fs.readFile("./bajs.txt", "utf8", (error, data) => {
  if (error) {
    console.log("Filen kunde inte öppnas");
    return;
  }
  console.log(data);
});
