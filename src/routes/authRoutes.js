const express = require("express");
const { signup, login } = require("../controllers/authController");
const { routes } = require("../app");
const { ownersignup, ownerlogin } = require('../controllers/ownerController')

const router = express.Router();


router.post("/user/signup", signup);
router.post("/user/login", login);

router.post("/owner/signup", ownersignup)
router.post("/owner/login", ownerlogin)

module.exports = router; 