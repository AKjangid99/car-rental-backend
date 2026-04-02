const express = require("express");
const { userAuthMiddleware } = require("../middleware/authMiddleware");

const {
    createBooking,
    getBookings,
    updateBooking,
    deleteBooking
} = require("../controllers/bookingController");

const router = express.Router();
exports.router = router;

router.use(userAuthMiddleware);
router.post("/", createBooking);
router.get("/", getBookings);
router.put("/:bookingId", updateBooking);
router.delete("/:bookingId", deleteBooking);

module.exports = router;