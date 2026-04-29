const express = require("express");
const { userAuthMiddleware } = require("../middleware/authMiddleware");

const {
    createBooking,
    getBookings,
    updateBooking,
    deleteBooking,
    getcars
} = require("../controllers/bookingController");

const router = express.Router();

// router.use(userAuthMiddleware);
router.post("/", createBooking);
router.get("/carlist/:location", getcars);
// router.get("/", getBookings);
router.put("/:bookingId", updateBooking);
router.delete("/:bookingId", deleteBooking);

module.exports = router;