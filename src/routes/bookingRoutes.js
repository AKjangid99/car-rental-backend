const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
    createBooking,
    getBookings,
    updateBooking,
    deleteBooking
} = require("../controllers/bookingController");

const router = express.Router();

router.use(authMiddleware);
router.post("/", createBooking);
router.get("/", getBookings);
router.put("/:bookingId", updateBooking);
router.delete("/:bookingId", deleteBooking);

module.exports = router;