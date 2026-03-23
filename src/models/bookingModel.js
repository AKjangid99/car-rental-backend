const pool = require("../config/db");

const createBookingDB = async (userId, carName, days, rentPerDay, status) => {
  const query = `
    INSERT INTO bookings (user_id, car_name, days, rent_per_day, status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const values = [userId, carName, days, rentPerDay, status];
  const result = await pool.query(query, values);
  return result.rows[0];
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
  `;
  await pool.query(query, [bookingId]);
};

const getBookingSummaryByUser = async (userId) => {
  const query = `
    SELECT
      $1::int AS "userId",
      u.username,
      COUNT(*) AS "totalBookings",
      COALESCE(SUM(days * rent_per_day), 0) AS "totalAmountSpent"
    FROM bookings b
    JOIN users u ON u.id = b.user_id
    WHERE b.user_id = $1 AND b.status IN ('booked', 'completed')
  `;
  const result = await pool.query(query, [userId]);
  return result.rows[0];
};

module.exports = {
  createBookingDB,
  getBookingsByUser,
  getBookingById,
  updateBookingDB,
  deleteBookingDB,
  getBookingSummaryByUser
};