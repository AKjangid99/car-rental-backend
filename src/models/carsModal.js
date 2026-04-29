const pool = require('../config/db')

const getcardetails = async (id) => {
    const query = ` SELECT * FROM cars where owner_id = $1`

    const result = await pool.query(query, [id])
    return result.rows
}

const createNewCarEntry = async (carName, mileage, seats, rentPerDay, location, airbags, isActive, OwnerId) => {

    const query = `INSERT INTO cars (owner_id , location , mileage, num_seats, rent, air_bags, carname, status)
        VALUES ( $1, $2, $3, $4, $5, $6, $7, $8 ) 
        RETURNING *`

    console.log("call start")
    const result = await pool.query(query, [OwnerId, location, mileage, seats, rentPerDay, airbags, carName, isActive])
    console.log(" call end  ")
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