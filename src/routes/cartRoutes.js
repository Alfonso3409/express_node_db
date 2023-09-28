const express = require("express");
const router = express.Router();

const {
  getCartItems,
  addToCart,
  updateCartItem,
  removeFromCart,
} = require("../controllers/cartController");

router.get("/api/cart", getCartItems);
router.post("/api/cart", addToCart);
router.put("/api/cart/:id", updateCartItem);
router.delete("/api/cart/:id", removeFromCart);
