
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const ownerRoutes = require("./routes/Own_carRoutes")
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors());


app.use("/auth", authRoutes);
app.use("/bookings", bookingRoutes);
app.use("/owner", ownerRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Car Rental API running" });
});

module.exports = app; 