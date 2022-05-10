const fs = require("fs");
const content = "\nBajaja alla gada!";

fs.unlink("./test.txt", (error) => {
  if (error) {
    console.log("Filen kunde inte tas bort");
    return;
  }
  console.log("Det gick");
});
