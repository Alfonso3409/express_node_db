const express = require("express");
const router = express.Router();

const {
  getUser,
  getSingleUser,
  newUser,
  login,
} = require("../controllers/userController");

router.get("/user", getUser);
router.get("/user/:id", getSingleUser);
router.post("/user", newUser);
router.post("/login", login);

module.exports = router;
