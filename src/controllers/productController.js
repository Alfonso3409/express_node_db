const axios = require("axios");
const pool = require("../../db");

const getAllProducts = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM products");
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products." });
  }
};

const getProductById = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM products WHERE id = $1", [
      req.params.id,
    ]);
    res.status(200).json(response.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product." });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, description, price, image_url, stock_quantity } = req.body;
    const response = await pool.query(
      "INSERT INTO products (name, description, price, image_url, stock_quantity, created_at) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP) RETURNING *",
      [name, description, price, image_url, stock_quantity]
    );
    res.status(200).json(response.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to add product." });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, price, image_url, stock_quantity } = req.body;
    const response = await pool.query(
      "UPDATE products SET name = $1, description = $2, price = $3, image_url = $4, stock_quantity = $5 WHERE id = $6 RETURNING *",
      [name, description, price, image_url, stock_quantity, req.params.id]
    );
    res.status(200).json(response.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product." });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const response = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    res.status(200).json(response.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product." });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
