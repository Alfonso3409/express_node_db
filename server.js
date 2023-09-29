const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = 3002;
require("dotenv").config();

app.use(express.json());
app.use(cors());

const userRoutes = require("./src/routes/userRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const productRoutes = require("./src/routes/productRoutes");

app.use("/api", cartRoutes);
app.use("/api", userRoutes);
app.use("/api", productRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on ${PORT}`);
});

// test route
app.get("/api/data-endpoint", (req, res) => {
  res.json({ message: "Hello from Express" });
});
