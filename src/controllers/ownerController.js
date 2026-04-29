const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { createOwner, getOwnerDetailsByEmail } = require("../models/ownerModel")
const ownerJWT = process.env.Owner_secret

const ownersignup = async (req, res) => {
    try {
        console.log(" starting rgjrogf  ")
        const { name, password, phone, email } = req.body
        if (!name || !password || !phone || !email) {
            return res.status(400).json({
                success: false,
                error: "invalid inputs"
            })
        }


        const hashedPassword = await bcrypt.hash(password, 10)

        const owner = await createOwner(name, hashedPassword, email, phone)



        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                role: "owner",
                ownerId: owner.id,
                ownerName: owner.name
            }
        })

    } catch (e) {

        if (e.code === '23505') {
            return res.status(409).json({
                success: false,
                error: "Email already exists"
            });
        }
        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}

const ownerlogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "email or password misiing"
            })
        }

        const userdetails = await getOwnerDetailsByEmail(email)

        const passwordMatch = await bcrypt.compare(password, userdetails.password_hash)

        if (passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "invalid credential"
            })
        }

        const Token = jwt.sign({
            user_Id: userdetails.id,
            name: userdetails.name
        }, ownerJWT)

        res.status(200).json({
            success: true,
            message: "login successfully",
            data: {
                username: userdetails.name,
                role: "owner",
                Token
            }
        })
    } catch (e) {

        res.status(500).json({
            success: false,
            message: "internal sarver error"
        })
    }
}


module.exports = { ownersignup, ownerlogin }