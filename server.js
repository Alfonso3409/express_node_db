const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3002;
require("dotenv").config();

app.use(express.json());

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// test route
app.get("/api/data-endpoint", (req, res) => {
  res.json({ message: "Hello from Express" });
});
