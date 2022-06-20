const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

// Models
const studentModel = require("./models/students.model");

// Middlewares
app.use(express.json());

// Routes
app.get("/students", async (req, res) => {
  const students = await studentModel.findAll();
  // Kalla på funktionen i modellen för att få motsvarande data här
  res.json(students)
})

// Listener
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})