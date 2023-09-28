const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/api/products", getAllProducts);
router.get("/api/products/:id", getProductById);
router.post("/api/products", addProduct);
router.put("/api/products/:id", updateProduct);
router.delete("/api/products/:id", deleteProduct);
