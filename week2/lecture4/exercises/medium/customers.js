const fs = require("fs");

const newCustomer = [
  {
    name: "Kalle",
    address: "ADHAD-gatan 3",
    phone: "+46123456",
    order: {
      item: "Bly",
      qty: "9001",
    },
  },
  {
    name: "Kula",
    address: "ADHAD-gatan 3",
    phone: "+46123456",
    order: {
      item: "Bly",
      qty: "9001",
    },
  },
];

fs.readFile("./customers.json", (error, data) => {
  if (error) {
    console.log("Filen kunde inte öppnas");
    return;
  }
  data = JSON.parse(data);
  data.customers.push(newCustomer);
  const newJson = JSON.stringify(data)

  fs.writeFile("./customers.json", newJson, (error) => {
    if (error) {
      console.log("Filen kunde inte skrivas");
      return;
    }
    console.log("Det gick");
  });
});




