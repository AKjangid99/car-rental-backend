const express = require("express");
const { signup, login } = require("../controllers/authController");
const { routes } = require("../app");
const { ownerSignup } = require('../controllers/ownerController')

const router = express.Router();


router.post("/user/signup", signup);
router.post("/user/login", login);

routes.post("/onwner/signup", ownerSignup)
routes.post("/onwner/login",)

module.exports = router; 