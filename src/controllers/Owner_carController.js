const {
    getcardetails,
    createNewCarEntry,
    getcardetailsbyId

} = require('../models/carsModal')

const getOwnerCars = async (req, res) => {

    try {
        const { OwnerId, ownerName } = req.body

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

        const { company, modal, car_number, OwnerId } = req.body
        if (!company || !modal || car_number || OwnerId) {
            res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }

        const cardetails = await createNewCarEntry(company, modal, car_number, OwnerId)

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

module.exports = { getOwnerCars, addNewCar, updateCarDetails }