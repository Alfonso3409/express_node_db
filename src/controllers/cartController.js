const getAllCarts = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/carts`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch carts." });
  }
};

const getCartById = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/carts/${req.params.id}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart." });
  }
};

const addCart = async (req, res) => {
  try {
    const response = await axios.post(`${BASE_URL}/carts`, req.body);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to add cart." });
  }
};

const updateCart = async (req, res) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/carts/${req.params.id}`,
      req.body
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to update cart." });
  }
};

const deleteCart = async (req, res) => {
  try {
    const response = await axios.delete(`${BASE_URL}/carts/${req.params.id}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete cart." });
  }
};

module.exports = {
  getAllCarts,
  getCartById,
  addCart,
  updateCart,
  deleteCart,
};
