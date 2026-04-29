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
        const verifyed = jwt.verify(token, JWT_SECRET);
        const decode = jwt.decode(token)
        if (verifyed) {
            req.user = {
                userId: decoded.userId,
                username: decoded.username
            };
        }
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


        console.log("1 =====================>")


        if (!authHeader) {
            return res.status(401).json({
                success: false,
                error: "Authorization header missing"
            })
        }

        console.log("ghdgd =====================>")


        const parts = authHeader.split(" ");
        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(401).json({
                success: false,
                error: "Token missing after Bearer"
            });
        }

        const token = parts[1]
        const verifyed = jwt.verify(token, OwnerSecreat)
        const decoded = jwt.decode(token)
        console.log("versifdsf")

        if (verifyed) {
            console.log(" ========================>", decoded)

            req.params.ownerId = decoded.user_Id,

                console.log("next ")
            next();
        } else {
            return res.status(401).json({
                success: false,
                error: "Unauthrise Access"
            })
        }

    } catch (e) {
        console.log(e)
    }
}

module.exports = { userAuthMiddleware, ownerAuthMiddleware };