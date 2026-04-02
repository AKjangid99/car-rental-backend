const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { createOwner, getOwnerDetailsByEmail } = require("../models/ownerModel")
const ownerJWT = process.env.Owner_secret

const ownersignup = async (req, res) => {
    try {

        const { ownerName, password, phone, email } = req.body
        if (!ownerName || !password || !phone || !email) {
            return res.status(400).json({
                success: false,
                error: "invalid inputs"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const owner = await createOwner(ownerName, hashedPassword, email, phone)

        console.log(owner)

        return res.status(201).json({
            success: true,
            data: {
                message: "User created successfully",
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
        console.log("1")
        const userdetails = await getOwnerDetailsByEmail(email)

        console.log(" >>>>>>>>>>>>>>>>>>  ", userdetails)

        console.log("2")
        const passwordMatch = await bcrypt.compare(password, userdetails.password_hash)
        console.log(passwordMatch)
        console.log("3")
        if (passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "invalid credential"
            })
        }

        console.log("4")
        const Token = jwt.sign({
            user_Id: userdetails.name,
            name: userdetails.name
        }, ownerJWT)

        res.status(200).json({
            success: true,
            data: {
                message: "login successfully",
                Token
            }
        })
    } catch (e) {

        res.status(500).json({
            success: false,
            message: "internal sarver error "
        })
    }
}


module.exports = { ownersignup, ownerlogin }