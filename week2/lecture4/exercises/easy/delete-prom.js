const fs = require("fs/promises");

async function remove() {
  try {
    await fs.unlink("./test.txt");
    console.log("Borttagen");
  } catch (error) {
    console.log("Gick åt helvete");
  }
}
remove();
