const {
    getcardetails,
    createNewCarEntry,
    getcardetailsbyId,
    deleteCar

} = require('../models/carsModal')

const getOwnerCars = async (req, res) => {
    try {

        console.log(" dfhk")

        const OwnerId = req.params.ownerId

        const carlist = await getcardetails(OwnerId)

        res.status(200).json(
            {
                success: "true",
                carlist: carlist
            }
        )
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "internal servar error"
        })
    }
}


const addNewCar = async (req, res) => {
    try {

        const { carName, mileage, seats, rentPerDay, location, airbags, isActive } = req.body

        const ownerId = req.params.ownerId

        console.log(carName, mileage, seats, rentPerDay, location, airbags, isActive, ownerId)

        if (!carName || !mileage || !seats || !rentPerDay || !location || !airbags || !isActive || !ownerId) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
        const cardetails = await createNewCarEntry(carName, mileage, seats, rentPerDay, location, airbags, isActive, ownerId)
        res.status(200).json({
            success: true,
            cardetails: cardetails
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: "internal servar error"
        })
    }
}

const updateCarDetails = async (req, res) => {

    const carid = req.params.carid;
    const { company, modal, car_number, OwnerId } = req.body

    if (!company || !modal || car_number || OwnerId) {
        res.status(400).json({
            success: false,
            message: "Bad Request"
        })
    }

    const cardetails = await getcardetailsbyId(carid)

    if (!cardetails) {
        return res.status(404).json({
            success: "false",
            message: "Not Found"
        })
    }

    if (cardetails.owner_id !== OwnerId) {
        return res.status(403).json({ success: false, error: "booking does not belong to user" });
    }

    cardetails.company = company
    cardetails.modal = modal
    cardetails.car_number = car_number

    const updatedDetails = await UpdateDetails(cardetails)

    res.status(200).json({
        success: "true",
        car_details: updatedDetailss
    })
}

const removecar = (req, res) => {

    try {
        const carid = req.params.carid

        if (!carid) {
            res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }

        const result = deleteCar(carid)

        console.log(result)

        res.res(200).json({
            success: true,
            message: "Deleted successffully"
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}

module.exports = { getOwnerCars, addNewCar, updateCarDetails, removecar }