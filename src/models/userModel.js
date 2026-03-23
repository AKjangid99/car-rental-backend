const pool = require("../config/db");

const findUserByUsername = async (username) => {
  const query = `
      SELECT id, username, password
      FROM users
      WHERE username = $1
    `;
  const result = await pool.query(query, [username]);
  return result.rows[0];
};

const createUser = async (name, password_hash, email, phone) => {
  const query = `
        INSERT INTO users (name, password_hash, email, phone)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name
      `;
  const result = await pool.query(query, [name, password_hash, email, phone]);
  return result.rows[0];
};

module.exports = {
  findUserByUsername,
  createUser
};