const pool = require('../config/db')

const createOwner = async (name, password_hash, email, phone) => {
    const query = `INSERT INTO car_owners(name, password_hash, email, phone)
        value($1, $2, $3, $4)
        RETURNING id, name 
        `
    const result = await pool.query(query, [name, password_hash, email, phone])
    return result.rows[0];
}


module.exports = { createOwner };