const pool = require('../config/db')

const getcardetails = async (id) => {
    const query = ` SELECT * FROM cars where owner_id = $1`

    const result = await pool.query(query, [id])
    return result.rows[0]
}

const createNewCarEntry = async (company, modal, car_number, owner_id, isbooked = "False") => {

    const query = `INSERT INTO cars (company, modal, car_number, owner_id, isbooked )
    VALUES ( $1, $2, $3, $4, $5 ) 
    RETURNING *`

    const result = await pool.query(query, [company, modal, car_number, owner_id, isbooked])
    return result.rows[0]

}

const getcardetailsbyId = async (car_id) => {
    const query = ` SELECT * FROM cars WHERE id = $1`

    const result = await pool.query(query, [car_id])
    return result.rows[0]
}

const UpdateDetails = async (cardetails) => {
    const query = `UPDATE cars 
    SET company = $1,
    modal = $2,
    car_number = $3,
    WHERE id = $4 
    RETURNING *
    `

    const result = await pool.query(query, [cardetails.company, cardetails.modal, cardetails.car_number, cardetails.id])
    return result.rows[0];
}

const deleteCar = async (carid) => {
    const query = ` DETELE FROM cars WHERE id = $1`

    const result = await pool.query(query, [carid]);
    return result
}

module.exports = { getcardetails, createNewCarEntry, getcardetailsbyId, deleteCar }