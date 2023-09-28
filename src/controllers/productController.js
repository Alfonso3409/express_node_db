const axios = require("axios");

const BASE_URL = "https://fakestoreapi.com";

const getAllProducts = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products." });
  }
};

const getProductById = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${req.params.id}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product." });
  }
};

const addProduct = async (req, res) => {
  try {
    const response = await axios.post(`${BASE_URL}/products`, req.body);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to add product." });
  }
};

const updateProduct = async (req, res) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/products/${req.params.id}`,
      req.body
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product." });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/products/${req.params.id}`
    );
    res.status(200).json(response.data);
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
