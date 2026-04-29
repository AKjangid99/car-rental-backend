const pool = require("../config/db");

const createBookingDB = async (userId, carId, start_date, end_date, totalCost, rentPerDay) => {

  await client.query('BEGIN');

  const checkOverlap = `
            SELECT id FROM bookings 
            WHERE car_id = $1 
            AND (start_date <= $3 OR end_date >= $2)
            FOR UPDATE;
        `;
  const overlapResult = await client.query(checkOverlap, [carId, start_date, end_date]);

  if (overlapResult.rows.length > 0) {
    await client.query('ROLLBACK');
    return false
  }

  const insertQuery = `
            INSERT INTO bookings (car_id, user_id, start_date, end_date, total_price, rent_per_day) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *;
        `;
  const booking = await client.query(insertQuery, [carId, userId, start_date, end_date, totalCost, rentPerDay]);

  await client.query('COMMIT');
  return res.status(201).json({ success: true, data: booking.rows[0] });
};



const getBookingsByUser = async (userId) => {
  const query = `
    SELECT *
    FROM bookings
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

const getBookingById = async (userId, bookingId) => {
  const query = `
    SELECT *
    FROM bookings
    WHERE id = $1
  `;
  const result = await pool.query(query, [bookingId]);
  return result.rows[0];
};


const updateBookingDB = async (bookingId, updatedBooking) => {
  const query = `
    UPDATE bookings
    SET car_name = $1,
        days = $2,
        rent_per_day = $3,
        status = $4
    WHERE id = $5
    RETURNING *
  `;
  const values = [
    updatedBooking.car_name,
    updatedBooking.days,
    updatedBooking.rent_per_day,
    updatedBooking.status,
    bookingId
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const deleteBookingDB = async (bookingId) => {
  const query = `
    DELETE FROM bookings
    WHERE id = $1
    RETURNING *
  `;
  await pool.query(query, [bookingId]);
};

const getcarlistwithlocation = async (location) => {
  const query = `SELECT * FROM cars where location = $1`

  const result = await pool.query(query, [location]);

  return result.rows
}

const getcarlist = async () => {
  const query = `
SELECT * FROM cars
`

  const result = await pool.query(query);
  return result.rows;

}

module.exports = {
  createBookingDB,
  getBookingsByUser,
  getBookingById,
  updateBookingDB,
  deleteBookingDB,
  getcarlistwithlocation,
  getcarlist
};