const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 5000;

app.get("/api/products", async (req, res) => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
