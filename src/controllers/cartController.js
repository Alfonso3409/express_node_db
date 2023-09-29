const axios = require("axios");
const pool = require("../../db");

const getCartItems = async (req, res) => {
  const userId = req.userId;

  try {
    const cartItems = await pool.query(
      "SELECT ci.product_id, ci.quantity, ci.price FROM cart c JOIN cart_items ci ON c.id = ci.cart_id WHERE c.user_id = $1",
      [userId]
    );

    res.status(200).json(cartItems.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart items." });
  }
};

// const addToCart = async () => {
//   try {
//     await axios.post("http://localhost:3002/api/cart", {
//       productId,
//       quantity: 1,
//     });
//     alert("Product added to cart!");
//   } catch (error) {
//     console.error("Backend response:", error.response);
//     alert("Failed to add product to cart.");
//   }
// };

const addToCart = async (req, res) => {
  const user_id = req.user.id;
  const { product_id, quantity } = req.body;

  try {
    // Check if the item already exists in the cart
    const existingCartItem = await pool.query(
      "SELECT id FROM cart WHERE user_id = $1 AND product_id = $2",
      [user_id, product_id]
    );

    if (existingCartItem.rows.length > 0) {
      await pool.query(
        "UPDATE cart SET quantity = quantity + $1 WHERE id = $2",
        [quantity, existingCartItem.rows[0].id]
      );
    } else {
      await pool.query(
        "INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3)",
        [user_id, product_id, quantity]
      );
    }

    res.status(200).json({ message: "Product added to cart successfully!" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res
      .status(500)
      .json({ message: "Failed to add to cart.", error: error.message });
  }
};

const updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const id = req.params.id;

  try {
    await pool.query("UPDATE cart_items SET quantity = $1 WHERE id = $2", [
      quantity,
      id,
    ]);
    res.status(200).json({ message: "Cart item updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update cart item." });
  }
};

const removeFromCart = async (req, res) => {
  const id = req.params.id;

  try {
    await pool.query("DELETE FROM cart_items WHERE id = $1", [id]);
    res.status(200).json({ message: "Cart item removed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove cart item." });
  }
};

module.exports = {
  getCartItems,
  addToCart,
  updateCartItem,
  removeFromCart,
};
