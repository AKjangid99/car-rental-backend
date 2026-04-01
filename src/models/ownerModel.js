const pool = require('../config/db')

const createOwner = async (name, password_hash, email, phone) => {
    try {
        const query = `INSERT INTO car_owners(name, password_hash, email, phone)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name 
    `
        console.log("qery build and send ")
        const result = await pool.query(query, [name, password_hash, email, phone])
        console.log("result  >>>>>>>>>>>>>>", result)
        return result.rows[0];
    } catch (e) {
        throw e
    }
}

const getOwnerDetailsByEmail = async (email) => {
    try {
        console.log("1.1")
        const query = `
        SELECT id, name, password_hash 
        FROM car_owners 
        WHERE email = $1`
        console.log("1.2")
        const result = await pool.query(query, [email])
        console.log("1.3")
        return result.rows[0]
    } catch (e) {

        console.log(e)
        throw e
    }
}

module.exports = { createOwner, getOwnerDetailsByEmail };