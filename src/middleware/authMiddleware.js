const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

const authMiddleware = (req, res, next) => {
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

module.exports = authMiddleware;