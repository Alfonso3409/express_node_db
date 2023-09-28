const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  placeOrder,
  getOrderById,
} = require("../controllers/orderController");

router.get("/api/orders", getAllOrders);
router.post("/api/orders", placeOrder);
router.get("/api/orders/:id", getOrderById);
