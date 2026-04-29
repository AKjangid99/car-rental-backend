const {
    createBookingDB,
    getBookingsByUser,
    getBookingById,
    updateBookingDB,
    deleteBookingDB,
    getcarlistwithlocation,
    getcarlist

} = require("../models/bookingModel");

const createBooking = async (req, res) => {
    try {
        const { carId, userId, start_date, end_date, rentPerDay } = req.body;
        // const userId = req.user.userId;

        if (!carId || !userId || !user_name || !start_date || !end_date) {
            return res.status(400).json({ success: false, error: "invalid inputs" });
        }

        const totalCost = days * rentPerDay;
        const booking = await createBookingDB(userId, carId, start_date, end_date, totalCost, rentPerDay);

        if (booking == false) {
            res.status(400).json({ success: false, error: "Car is already booked for these dates." });
        }

        return res.status(201).json({
            success: true,
            data: {
                message: "Booking created successfully",
                bookingId: booking.id,
            }
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};


const updateBooking = async (req, res) => {
    try {
        const userId = req.user.userId;
        const bookingId = req.params.bookingId;
        const { carName, days, rentPerDay, status } = req.body;

        const booking = await getBookingById(userId, bookingId);

        if (!booking) {
            return res.status(404).json({ success: false, error: "booking not found" });
        }

        if (booking.user_id !== userId) {
            return res.status(403).json({ success: false, error: "booking does not belong to user" });
        }

        let updatedBooking = { ...booking };

        if (status) updatedBooking.status = status;
        if (carName) updatedBooking.car_name = carName;
        if (days) updatedBooking.days = days;
        if (rentPerDay) updatedBooking.rent_per_day = rentPerDay;

        if (updatedBooking.days >= 365 || updatedBooking.rent_per_day > 2000) {
            return res.status(400).json({ success: false, error: "invalid inputs" });
        }

        updatedBooking = await updateBookingDB(bookingId, updatedBooking);
        updatedBooking.totalCost = updatedBooking.days * updatedBooking.rent_per_day;

        return res.status(200).json({
            success: true,
            data: { message: "Booking updated successfully", booking: updatedBooking }
        });

    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

const deleteBooking = async (req, res) => {
    try {
        const userId = req.user.userId;
        const bookingId = req.params.bookingId;

        const booking = await getBookingById(userId, bookingId);

        if (!booking) {
            return res.status(404).json({ success: false, error: "booking not found" });
        }

        if (booking.user_id !== userId) {
            return res.status(403).json({ success: false, error: "booking does not belong to user" });
        }

        await deleteBookingDB(bookingId);

        return res.status(200).json({
            success: true,
            message: "Booking deleted successfully"
        });

    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

const getcars = async (req, res) => {
    const searchTerm = req.params.location ? req.params.location.trim() : null;
    let carlist

    console.log(searchTerm)
    if (searchTerm) {
        carlist = await getcarlistwithlocation(searchTerm)
    }


    res.status(200).json({
        message: " list retrived",
        success: "true",
        data: carlist
    })
}

module.exports = { createBooking, updateBooking, deleteBooking, getcars };