const { ownerAuthMiddleware } = require("../middleware/authMiddleware");;
// const userAuthMiddleware = require("../middleware/userAuthMiddleware");
const { router } = require("./bookingRoutes");



router.use(ownerAuthMiddleware);
