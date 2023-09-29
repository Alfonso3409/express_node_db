const express = require("express");
const router = express.Router();

const {
  getCartItems,
  addToCart,
  updateCartItem,
  removeFromCart,
} = require("../controllers/cartController");

const authenticateJWT = require("../middleware/JWT");

router.get("/api/cart", authenticateJWT, getCartItems);
router.post("/api/cart", authenticateJWT, addToCart);
router.put("/api/cart/:id", authenticateJWT, updateCartItem);
router.delete("/api/cart/:id", authenticateJWT, removeFromCart);

module.exports = router;
