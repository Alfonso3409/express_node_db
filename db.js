const { password } = require("pg/lib/defaults");

const POOL = require("pg").Pool;

const pool = new POOL({
  user: "postgres",
  host: "host.docker.internal",
  database: "Capstone",
  password: "97221991",
  port: 5434,
});

module.exports = pool;
