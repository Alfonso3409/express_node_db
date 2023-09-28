const pool = require("../../db");

const getAllOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const results = await pool.query(
      "SELECT * FROM orders WHERE user_id = $1",
      [userId]
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders." });
  }
};

const placeOrder = async (req, res) => {
  const userId = req.user.id;
  // Add other order details from req.body as needed

  try {
    // Insert order details into the database
    // You might also need to clear the cart after placing an order
    res.status(200).send("Order placed successfully");
  } catch (error) {
    res.status(500).json({ message: "Failed to place order." });
  }
};

const getOrderById = async (req, res) => {
  const userId = req.user.id;
  const orderId = req.params.id;

  try {
    const results = await pool.query(
      "SELECT * FROM orders WHERE user_id = $1 AND order_id = $2",
      [userId, orderId]
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order details." });
  }
};

module.exports = {
  getAllOrders,
  placeOrder,
  getOrderById,
};
