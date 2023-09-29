const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const morgan = require("morgan");
const pool = require("../../db");
const dotenv = require("dotenv");

dotenv.config();

if (!process.env.WEB_TOKEN) {
  throw new Error("WEB_TOKEN is not defined in .env file");
}

const app = express();
app.use(cors());
app.use(morgan("combined")); // using morgan for logging still learning its use

// to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.WEB_TOKEN);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

const getUser = async (req, res) => {
  console.log("I am in here");
  try {
    const results = await pool.query("SELECT * FROM user");
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user." });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT * FROM users WHERE users_id = $1",
      [req.params.id]
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user." });
  }
};

const newUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  let missingFields = [];

  if (!username) missingFields.push("Username is required");
  if (!email) missingFields.push("Must use a valid Email");
  if (!password) missingFields.push("Must create a password");

  if (missingFields.length > 0) {
    return res.status(400).send(`Missing fields: ${missingFields.join(", ")}`);
  }

  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  if (!re.exec(email)) {
    return res.status(400).send("Email is invalid");
  }

  try {
    await pool.query(
      "INSERT INTO users(username, email, password) VALUES($1, $2, $3)",
      [username, email, hashPassword]
    );
    res.status(200).send("Inserted into table");
    const accessToken = jwt.sign({ username }, process.env.WEB_TOKEN, {
      expiresIn: "15m",
    });
    return res.status(200).json({ token: accessToken });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(400)
      .send("An error occurred. Check the server logs for details.");
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Missing username or password");
  }

  try {
    const results = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (results.rows.length === 0) {
      return res.status(400).send("Username not found");
    }

    const hashedPassword = results.rows[0].password;
    const match = await bcrypt.compare(password, hashedPassword);
    if (match) {
      const accessToken = jwt.sign({ username }, process.env.WEB_TOKEN, {
        expiresIn: "15m",
      });
      return res.status(200).json({ token: accessToken });
    } else {
      return res.status(400).send("Your password or username is incorrect");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
};

module.exports = {
  getUser,
  getSingleUser,
  newUser,
  login,
};
