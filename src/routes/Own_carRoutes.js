const express = require("express");
const { ownerAuthMiddleware } = require("../middleware/authMiddleware");;
const { getOwnerCars, addNewCar, updateCarDetails } = require("../controllers/Owner_carController")

const router = express.Router();



router.use(ownerAuthMiddleware);


router.get("/", getOwnerCars)
router.post("/", addNewCar)
router.put("/:carid", updateCarDetails)
router.delete("/:carid",)




module.exports = router;