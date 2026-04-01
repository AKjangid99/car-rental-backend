const pool = require("../config/db");

const findUserByEmail = async (email) => {
  const query = `
      SELECT id , email , password_hash
      FROM users
      WHERE email = $1
    `;
  const result = await pool.query(query, [email]);
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
  findUserByEmail,
  createUser
};