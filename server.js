const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3002;
require("dotenv").config();
const userRoutes = require("./src/routes/userRoutes");

app.use(express.json());

app.use(cors());

// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`);
// });

app.use("/api", userRoutes);
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on ${PORT}`);
});

// test route
app.get("/api/data-endpoint", (req, res) => {
  res.json({ message: "Hello from Express" });
});

app.get("/api/products", async (req, res) => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products." });
  }
});
