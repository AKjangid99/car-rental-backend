const {
    createBookingDB,
    getBookingsByUser,
    getBookingById,
    updateBookingDB,
    deleteBookingDB,
    getBookingSummaryByUser
} = require("../models/bookingModel");

const createBooking = async (req, res) => {
    try {
        const { carName, days, rentPerDay } = req.body;
        const userId = req.user.userId;

        if (!carName || !days || !rentPerDay || days >= 365 || rentPerDay > 2000) {
            return res.status(400).json({ success: false, error: "invalid inputs" });
        }

        const status = "booked";
        const totalCost = days * rentPerDay;

        const booking = await createBookingDB(userId, carName, days, rentPerDay, status);

        return res.status(201).json({
            success: true,
            data: {
                message: "Booking created successfully",
                bookingId: booking.id,
                totalCost
            }
        });

    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

const getBookings = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { bookingId, summary } = req.query;

        if (summary === "true") {
            const summaryData = await getBookingSummaryByUser(userId);
            return res.status(200).json({ success: true, data: summaryData });
        }

        if (bookingId) {
            const booking = await getBookingById(userId, bookingId);

            if (!booking) {
                return res.status(404).json({ success: false, error: "bookingId not found" });
            }

            booking.totalCost = booking.days * booking.rent_per_day;

            return res.status(200).json({ success: true, data: [booking] });
        }

        const bookings = await getBookingsByUser(userId);
        bookings.forEach(b => {
            b.totalCost = b.days * b.rent_per_day;
        });

        return res.status(200).json({ success: true, data: bookings });

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
            data: { message: "Booking deleted successfully" }
        });

    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

module.exports = { createBooking, getBookings, updateBooking, deleteBooking };