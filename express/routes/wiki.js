const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Du är inne på wiki");
});

router.get("/about", (req, res) => {
  res.send("Du är inne på wiki about");
});

module.exports = router;
