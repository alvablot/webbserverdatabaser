const fs = require("fs");
const content = "\nBajaja alla gada!";

fs.writeFile("./test.txt", content, { flag: 'a+' }, (error) => {
  if (error) {
    console.log("Filen kunde inte skrivas");
    return;
  }
  console.log("Det gick");
});
