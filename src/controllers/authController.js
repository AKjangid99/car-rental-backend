const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { createUser, findUserByEmail } = require("../models/userModel");

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

const signup = async (req, res) => {
    try {
        const { name, password, email, phone } = req.body;
        if (!name || !password || !email || !phone) {
            return res.status(400).json({
                success: false,
                error: "invalid inputs"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(name, hashedPassword, email, phone);

        return res.status(201).json({
            success: true,
            data: {
                message: "User created successfully",
                userId: user.id
            }
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: "invalid inputs"
            });
        }

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                success: false,
                error: "user does not exist"
            });
        }
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                error: "incorrect password"
            });
        }
        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username
            },
            JWT_SECRET
        );
        return res.status(200).json({
            success: true,
            data: {
                message: "Login successful",
                token
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

module.exports = { signup, login };