const psql = require("pg");
const { Pool } = psql;

const db = new Pool({
  user: "teguh",
  host: "localhost",
  database: "teguh",
  password: "1234",
  port: 5432,
});

module.exports = db;
