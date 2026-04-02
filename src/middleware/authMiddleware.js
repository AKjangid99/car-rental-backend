const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "secretkey";
const OwnerSecreat = process.env.Owner_secret || "secretkey"

const userAuthMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                error: "Authorization header missing"
            });
        }

        const parts = authHeader.split(" ");
        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(401).json({
                success: false,
                error: "Token missing after Bearer"
            });
        }
        const token = parts[1];
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = {
            userId: decoded.userId,
            username: decoded.username
        };
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            error: "Token invalid"
        });
    }
};

const ownerAuthMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                error: "Authorization header missing"
            })
        }

        const parts = authHeader.split(" ");
        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(401).json({
                success: false,
                error: "Token missing after Bearer"
            });
        }

        const token = parts[1]
        const verifyed = jwt.verify(token, OwnerSecreat)

        if (verify) {
            req.owner = {
                userId: decoded.userId,
                username: decoded.username
            };
            next();
        } else {
            return res.status(401).json({
                success: false,
                error: "Unauthrise Access"
            })
        }

    } catch (e) {

    }
}

module.exports = { userAuthMiddleware, ownerAuthMiddleware };