
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();


app.use(express.json());


app.use("/auth", authRoutes);
app.use("/bookings", bookingRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Car Rental API running" });
});

module.exports = app; 