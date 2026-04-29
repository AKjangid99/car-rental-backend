const express = require("express");
const { ownerAuthMiddleware } = require("../middleware/authMiddleware");;
const { getOwnerCars, addNewCar, updateCarDetails, removecar } = require("../controllers/Owner_carController")

const router = express.Router();


router.get("/", ownerAuthMiddleware, getOwnerCars)
router.post("/add", ownerAuthMiddleware, addNewCar)
router.put("/:carid", ownerAuthMiddleware, updateCarDetails)
router.delete("/:carid", ownerAuthMiddleware, removecar)


module.exports = router;